import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobPostEntity, SearchPreferenceEntity, UserEntity } from '@app/database';
import { JobPostIdValidator } from '@app/database/validators/JobPostId.validator';
import { UserSkippedJobEntity } from '@app/database/entities/UserSkippedJob.entity';
import { UserSavedJobEntity } from '@app/database/entities/UserSavedJob.entity';
import { UserAppliedJobEntity } from '@app/database/entities/UserAppliedJob.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      UserEntity,
      JobPostEntity,
      SearchPreferenceEntity,
      UserSkippedJobEntity,
      UserSavedJobEntity,
      UserAppliedJobEntity,
    ]),
  ],
  providers: [UserService, JobPostIdValidator],
  controllers: [UserController],
})
export class UserModule {}
