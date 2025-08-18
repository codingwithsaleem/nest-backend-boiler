import { EntityManager } from '@mikro-orm/core';
import { UserEntity } from '@app/database';
import { PublicJobPost } from '@api/user/classes/PublicJobPost';
import { UserSkippedJobEntity } from '@app/database/entities/UserSkippedJob.entity';
import { UserSavedJobEntity } from '@app/database/entities/UserSavedJob.entity';
import { UserAppliedJobEntity } from '@app/database/entities/UserAppliedJob.entity';

/**
 * Represents a skipped job by the user.
 */
class SkippedJob {
  jobPost: PublicJobPost;
  createdAt: Date;

  /**
   * Constructs a SkippedJob instance.
   * @param job - The skipped job entity.
   */
  constructor(job: UserSkippedJobEntity) {
    this.jobPost = new PublicJobPost(job.jobPost);
    this.createdAt = job.createdAt;
  }
}

/**
 * Represents a saved job by the user.
 */
class SavedJob {
  jobPost: PublicJobPost;
  createdAt: Date;

  /**
   * Constructs a SavedJob instance.
   * @param job - The saved job entity.
   */
  constructor(job: UserSavedJobEntity) {
    this.jobPost = new PublicJobPost(job.jobPost);
    this.createdAt = job.createdAt;
  }
}

/**
 * Represents an applied job by the user.
 */
class AppliedJob {
  jobPost: PublicJobPost;
  createdAt: Date;

  /**
   * Constructs an AppliedJob instance.
   * @param job - The applied job entity.
   */
  constructor(job: UserAppliedJobEntity) {
    this.jobPost = new PublicJobPost(job.jobPost);
    this.createdAt = job.createdAt;
  }
}

/**
 * Represents the status of job posts for a user.
 */
export class UserJobPostsStatus {
  savedJobs: SavedJob[];
  appliedJobs: AppliedJob[];
  skippedJobs: SkippedJob[];

  /**
   * Constructs a UserJobPostsStatus instance.
   * @param user - The user entity.
   * @param skippedJobs - The list of skipped job entities.
   * @param savedJobs - The list of saved job entities.
   * @param appliedJobs - The list of applied job entities.
   */
  constructor(
    user: UserEntity,
    skippedJobs: UserSkippedJobEntity[],
    savedJobs: UserSavedJobEntity[],
    appliedJobs: UserAppliedJobEntity[],
  ) {
    this.savedJobs = (savedJobs ?? []).map(savedJob => new SavedJob(savedJob));
    this.appliedJobs = (appliedJobs ?? []).map(appliedJob => new AppliedJob(appliedJob));
    this.skippedJobs = (skippedJobs ?? []).map(skippedJob => new SkippedJob(skippedJob));
  }
}

/**
 * Service to handle user job posts related operations.
 */
export class UserService {
  /**
   * Constructs a UserService instance.
   * @param em - The entity manager used to interact with the database.
   */
  constructor(private readonly em: EntityManager) {}

  /**
   * Retrieves the job posts status for the user.
   * @param userId - The user id.
   * @returns - The user job posts status.
   */
  public async getJobPostsStatus(userId: string): Promise<UserJobPostsStatus> {
    const user = await this.em.findOneOrFail(UserEntity, userId);

    const skippedJobs = await this.em.find(
      UserSkippedJobEntity,
      { user: userId },
      { populate: ['jobPost'] },
    );

    const savedJobs = await this.em.find(
      UserSavedJobEntity,
      { user: userId },
      { populate: ['jobPost'] },
    );

    const appliedJobs = await this.em.find(
      UserAppliedJobEntity,
      { user: userId },
      { populate: ['jobPost'] },
    );

    return new UserJobPostsStatus(user, skippedJobs, savedJobs, appliedJobs);
  }
}
