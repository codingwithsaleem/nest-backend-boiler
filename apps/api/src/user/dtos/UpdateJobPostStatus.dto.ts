import { Action } from '@api/user/enums/Action.enum';
import { Status } from '@api/user/enums/Status.enum';
import { JobPostIdValidator } from '@app/database/validators/JobPostId.validator';
import { IsEnum, IsUUID, Validate } from 'class-validator';

export class UpdateJobPostStatusDto {
  @IsEnum(Status)
  status: Status;

  @IsEnum(Action)
  action: Action;

  @IsUUID()
  @Validate(JobPostIdValidator)
  jobPostId: string;
}
