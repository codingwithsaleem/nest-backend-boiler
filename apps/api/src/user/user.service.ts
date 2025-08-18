import { UserJobPostsStatus } from '@api/user/classes/JobPostsStatus';
import { PublicJobPost } from '@api/user/classes/PublicJobPost';
import { UpdateJobPostStatusDto } from '@api/user/dtos/UpdateJobPostStatus.dto';
import { Action } from '@api/user/enums/Action.enum';
import { Status } from '@api/user/enums/Status.enum';
import {
  FindPaginateResponse,
  JobPostRepository,
  SearchPreferenceEntity,
  SearchPreferenceRepository,
  UserEntity,
  UserRepository,
  UserSkippedJobEntity,
} from '@app/database';
import { ValidationException } from '@app/shared';
import { Loaded, QueryOrder } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSkippedJobRepository } from '@app/database/repositories/UserSkippedJob.repository';
import { UserSavedJobRepository } from '@app/database/repositories/UserSavedJob.repository';
import { UserAppliedJobRepository } from '@app/database/repositories/UserAppliedJob.repository';
import { UserSavedJobEntity } from '@app/database/entities/UserSavedJob.entity';
import { UserAppliedJobEntity } from '@app/database/entities/UserAppliedJob.entity';

@Injectable()
export class UserService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public readonly userRepository: UserRepository,
    private readonly searchPreferenceRepository: SearchPreferenceRepository,
    private readonly jobPostRepository: JobPostRepository,
    private readonly userSkippedJobRepository: UserSkippedJobRepository,
    private readonly userSavedJobRepository: UserSavedJobRepository,
    private readonly userAppliedJobRepository: UserAppliedJobRepository,
  ) {}

  /**
   * Retrieves a paginated list of all users.
   * @param limit - The maximum number of users to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A paginated response containing user entities.
   */
  public async getAllPaginatedUsers(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<UserEntity>> {
    return await this.userRepository.findAllPaginated({
      limit,
      page,
      orderBy: { lastName: QueryOrder.ASC },
    });
  }

  /**
   * Retrieves a user by their email address.
   * @param email - The email address of the user.
   * @returns UserEntity object if found.
   * @throws BadRequestException if the user is not found.
   */
  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { email },
      { fields: ['savedJobs', 'appliedJobs', 'skippedJobs'] },
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /**
   *Finds job posts that match given search preferences, with pagination.
   * @param searchPref User's Search preferences
   * @param limit The maximum number of job posts to return.
   * @param page The current page number for pagination.
   * @returns A paginated response with job posts matching the search criteria.
   */
  /**
   * Finds job posts that match given search preferences, with pagination.
   * @param searchPref User's Search preferences
   * @param limit The maximum number of job posts to return.
   * @param page The current page number for pagination.
   * @returns A paginated response with job posts matching the search criteria.
   */
  private async findJobPostsPaginated(
    searchPref: Loaded<SearchPreferenceEntity, 'industries' | 'locations' | 'jobs'>,
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicJobPost>> {
    const baseQuery = {
      contractType: searchPref?.contractType
        ? { $in: searchPref.contractType }
        : undefined,
      experienceLevel: { $in: searchPref?.experienceLevel },
      industry: { id: { $in: searchPref?.industries.map(i => i.id) } },
      role: { id: { $in: searchPref?.jobs.map(j => j.id) } },
      region: { $in: searchPref?.locations.map(sp => sp.id) },
    };

    let query: any = baseQuery;

    if (searchPref?.minSalary) {
      query = {
        ...baseQuery,
        $or: [
          { minSalary: { $gte: searchPref.minSalary } },
          { minSalary: { $exists: false } },
          { minSalary: null },
        ],
      };
    }

    const jobPosts = await this.jobPostRepository.findPaginated(query, {
      limit,
      page,
      orderBy: { createdAt: QueryOrder.DESC },
    });

    return {
      meta: jobPosts.meta,
      items: jobPosts.items.map(jp => new PublicJobPost(jp)),
    };
  }

  /**
   * Retrieves matched job posts for a user based on their search preferences
   * @param userId The ID of the user for whom to find matching job posts.
   * @param limit The number of job posts to fetch per page.
   * @param originalPage The starting page number for fetching job posts.
   * @returns A paginated response with job posts that match the user's
   * search preferences and have not been skipped, saved, or applied by the user.
   */
  public async getMatches(
    userId: string,
    limit: number,
    originalPage: number,
  ): Promise<FindPaginateResponse<PublicJobPost>> {
    const jobPostsStatus = await this.getJobPostsStatus(userId);

    const skippedJobPostIds = new Set(
      jobPostsStatus.skippedJobs.map(job => job.jobPost.id),
    );
    const savedJobPostIds = new Set(jobPostsStatus.savedJobs.map(job => job.jobPost.id));
    const appliedJobPostIds = new Set(
      jobPostsStatus.appliedJobs.map(job => job.jobPost.id),
    );
    // const savedJobPostIds = new Set(jobPostsStatus.savedJobs.map(job => job.id));
    // const appliedJobPostIds = new Set(jobPostsStatus.appliedJobs.map(job => job.id));

    const searchPref = await this.searchPreferenceRepository.findOne(
      { user: userId },
      { populate: ['industries', 'jobs', 'locations'] },
    );

    let page = originalPage;
    let allFilteredJobPosts: PublicJobPost[] = [];
    let fetchedJobPosts;
    while (allFilteredJobPosts.length < 1) {
      fetchedJobPosts = await this.findJobPostsPaginated(searchPref, limit, page);
      const filteredJobPosts = fetchedJobPosts.items.filter(jobPost => {
        // Filtrer par taille de l'entreprise si les préférences de recherche incluent des tailles d'entreprise spécifiques
        const matchesCompanySize = searchPref.companySize
          ? !jobPost.companySize ||
            searchPref.companySize.some(size => jobPost.companySize?.includes(size))
          : true;
        return (
          !skippedJobPostIds.has(jobPost.id) &&
          !savedJobPostIds.has(jobPost.id) &&
          !appliedJobPostIds.has(jobPost.id) &&
          matchesCompanySize
        );
      });

      if (filteredJobPosts.length > 0) {
        allFilteredJobPosts = filteredJobPosts;
      }
      page++;
      if (page > fetchedJobPosts.meta.totalPages) {
        break;
      }
    }

    fetchedJobPosts.meta.itemCount = allFilteredJobPosts.length;
    return {
      meta: fetchedJobPosts.meta,
      items: allFilteredJobPosts,
    };
  }

  /********* JobPost Actions *********/

  /**
   * Retrieves the job posts status for the user
   * @param userId The user id
   * @returns The user job posts status
   */
  public async getJobPostsStatus(userId: string): Promise<UserJobPostsStatus> {
    const user = await this.userRepository.findOneOrFail(userId);

    const skippedJobs = await this.userSkippedJobRepository.find(
      { user: userId },
      { populate: ['jobPost'] },
    );
    const savedJobs = await this.userSavedJobRepository.find(
      { user: userId },
      { populate: ['jobPost'] },
    );
    const appliedJobs = await this.userAppliedJobRepository.find(
      { user: userId },
      { populate: ['jobPost'] },
    );

    return new UserJobPostsStatus(user, skippedJobs, savedJobs, appliedJobs);
  }

  /**
   * Updates the job post status for a user.
   * @param userId - The ID of the user.
   * @param dto - The DTO (Data Transfer Object) containing the updated job post status.
   * @throws NotFoundException if the user is not found.
   */
  public async updateJobPostStatus(
    userId: string,
    dto: UpdateJobPostStatusDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const jobPost = await this.jobPostRepository.findOne(dto.jobPostId);
    if (!jobPost) {
      throw new NotFoundException(`JobPost with ID ${dto.jobPostId} not found.`);
    }

    // Handle skipped jobs
    if (dto.status === Status.SKIP) {
      if (dto.action === Action.ADD) {
        const userSkippedJob = new UserSkippedJobEntity();
        userSkippedJob.user = user;
        userSkippedJob.jobPost = jobPost;
        await this.userSkippedJobRepository.save(userSkippedJob);
      } else if (dto.action === Action.REMOVE) {
        const userSkippedJob = await this.userSkippedJobRepository.findOne({
          user,
          jobPost,
        });
        if (userSkippedJob) {
          await this.userSkippedJobRepository.removeAndFlush(userSkippedJob);
        }
      }
    }

    // Handle saved jobs
    if (dto.status === Status.SAVE) {
      if (dto.action === Action.ADD) {
        const userSavedJob = new UserSavedJobEntity();
        userSavedJob.user = user;
        userSavedJob.jobPost = jobPost;
        await this.userSavedJobRepository.save(userSavedJob);
      } else if (dto.action === Action.REMOVE) {
        const userSavedJob = await this.userSavedJobRepository.findOne({
          user,
          jobPost,
        });
        if (userSavedJob) {
          await this.userSavedJobRepository.removeAndFlush(userSavedJob);
        }
      }
    }

    // Handle applied jobs
    if (dto.status === Status.APPLY) {
      if (dto.action === Action.ADD) {
        const userAppliedJob = new UserAppliedJobEntity();
        userAppliedJob.user = user;
        userAppliedJob.jobPost = jobPost;
        await this.userAppliedJobRepository.save(userAppliedJob);
      } else if (dto.action === Action.REMOVE) {
        const userAppliedJob = await this.userAppliedJobRepository.findOne({
          user,
          jobPost,
        });
        if (userAppliedJob) {
          await this.userAppliedJobRepository.removeAndFlush(userAppliedJob);
        }
      }
    }
  }

  /**
   * Remove User Email
   * @param userId - the user ID
   * @returns -
   */
  public async removeUserEmail(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    user.email = null;
    this.userRepository.persistAndFlush(user);
  }

  /**
   * Returns the corresponding job post status property to update based on the given status.
   * @param status The status value.
   * @returns The job post field property to update.
   * @throws HttpException if the status is invalid.
   */
  private _getJobPostFieldToUpdate(status: Status) {
    switch (status) {
      case Status.APPLY:
        return 'appliedJobs';
      case Status.SAVE:
        return 'savedJobs';
      case Status.SKIP:
        return 'skippedJobs';
      default:
        throw new ValidationException('Invalid status');
    }
  }
}
