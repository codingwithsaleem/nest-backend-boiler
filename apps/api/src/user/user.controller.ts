import { UserJobPostsStatus } from '@api/user/classes/JobPostsStatus';
import { PublicJobPost } from '@api/user/classes/PublicJobPost';
import { UserProfile } from '@api/user/classes/UserProfile';
import { UpdateJobPostStatusDto } from '@api/user/dtos/UpdateJobPostStatus.dto';
import { UpdateUserDto } from '@api/user/dtos/UpdateUser.dto';
import { UserService } from '@api/user/user.service';
import { Admin, User, UserRequest } from '@app/authentication';
import { FindPaginateResponse, UserEntity } from '@app/database';
import { IsEmailPipe } from '@app/shared';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
@Controller('user')
@ApiTags('User')
export class UserController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves a paginated list of all users.
   * @param limit - The maximum number of users to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A paginated response containing user entities.
   */
  @Get('many')
  @Admin()
  async getAllPaginatedUsers(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<UserEntity>> {
    return await this.userService.getAllPaginatedUsers(limit, page);
  }

  /**
   * Retrieves a user by their email address.
   * @param email - The email address of the user.
   * @returns UserEntity object if found.
   * @throws BadRequestException if the user is not found.
   */
  @Get('admin')
  @Admin()
  async getUserByEmail(@Query('email', IsEmailPipe) email: string): Promise<UserEntity> {
    return await this.userService.getUserByEmail(email);
  }

  /**
   * Get User Profile
   * @param req - The request object
   * @returns - The user profile
   */
  @Get()
  @User()
  async getUser(@Req() req: UserRequest): Promise<UserProfile> {
    return new UserProfile(req.user);
  }

  /**
   * Retrieve Matches based on Search Preferences of the User
   * @param req - The user request
   * @param limit - Number of Items to retrieve
   * @param page - The Page index
   * @returns Teh matches paginated
   */
  @Get('matches')
  @User()
  async getMatchesPaginated(
    @Request() req: UserRequest,
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicJobPost>> {
    return await this.userService.getMatches(req.user.id, limit, page);
  }

  /********* JobPost Actions *********/

  /**
   * Retrieves the job posts status for the user
   * @param req The user request
   * @returns The user job posts status
   */
  @Get('job-post/status')
  @User()
  async getJobPosts(@Request() req: UserRequest): Promise<UserJobPostsStatus> {
    return await this.userService.getJobPostsStatus(req.user.id);
  }

  /**
   * Update User
   * @param req - the User Request
   * @param dto - the updateUser dto
   * @returns -
   */
  @Put()
  @User()
  async updateUser(
    @Request() req: UserRequest,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.userRepository.update(
      req.user.id,
      instanceToPlain(dto, { exposeUnsetFields: false }),
    );
  }

  /**
   * Updates the status of a job post.
   * @param req The request object containing user information.
   * @param dto The data transfer object containing the updated job post status.
   * @returns -
   */
  @Put('job-post/status')
  @User()
  async updateJobPostStatus(
    @Request() req: UserRequest,
    @Body() dto: UpdateJobPostStatusDto,
  ): Promise<void> {
    await this.userService.updateJobPostStatus(req.user.id, dto);
  }

  /**
   * Remove User Email
   * @param req - the User Request object
   * @returns -
   */
  @Delete()
  @User()
  async removeUserEmail(@Request() req: UserRequest): Promise<void> {
    return this.userService.removeUserEmail(req.user.id);
  }
}
