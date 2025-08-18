import {
  AdminAuthController,
  AdminAuthService,
  AdminJwtStrategy,
  AdminLoginStrategy,
  AdminRecoverStrategy,
  AdminRefreshStrategy,
  AdminTFAStrategy,
} from '@app/authentication/admin';
import {
  ConfirmPasswordGuard,
  UserAuthController,
  UserAuthService,
  UserJwtStrategy,
  UserLoginStrategy,
  UserRecoverStrategy,
  UserRefreshStrategy,
  UserRegistrationStrategy,
  UserTFAStrategy,
} from '@app/authentication/user';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { validateAuthenticationEnvironment } from '@app/authentication/environment/auth.environment.validation';
import { AuthService } from '@app/authentication/auth.service';
import { InjectUserInterceptor } from '@app/authentication/interceptors/InjectUser.interceptor';
import {
  DatabaseModule,
  AdminEntity,
  UserEntity,
  RegionEntity,
  JobEntity,
  IndustryEntity,
  SearchPreferenceEntity,
} from '@app/database';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailingModule } from '@app/mailing';
import { RedisModule, RedisService } from '@app/redis';
import { UserWsGuard } from '@app/authentication/user/guards/user.tfa.ws.guard';
import { LoggerModule } from '@app/logger';
import { LinkedInStrategy } from '@app/authentication/user/strategies/user.linkedin.strategy';
import { LinkedInOauthGuard } from '@app/authentication/user/guards/user.linkedin.guard';
import { LocationIdValidator } from '@app/shared/validators/LocationId.validator';
import { JobIdValidator } from '@app/database/validators/JobId.validator';
import { LinkedInRegistrationStrategy } from '@app/authentication/user/strategies/user.linkedinRegistration.strategy';
// import { SearchPreferenceService } from '@api/searchPreference/searchPreference.service';
import { IndustryIdValidator } from '@app/database/validators/IndustryId.validator';
import { GoogleStrategy } from '@app/authentication/user/strategies/user.google.strategy';
import { LinkedInRegistrationOauthGuard } from '@app/authentication/user/guards/user.linkedinRegistration.guard';
import { GoogleOauthGuard } from '@app/authentication/user/guards/user.google.guard';
import { GoogleRegistrationStrategy } from '@app/authentication/user/strategies/user.googleRegistration.strategy';
import { GoogleRegistrationOauthGuard } from '@app/authentication/user/guards/user.googleRegistration.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateAuthenticationEnvironment,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule, LoggerModule],
      useClass: AuthService,
    }),
    RedisModule,
    DatabaseModule,
    MikroOrmModule.forFeature([
      AdminEntity,
      UserEntity,
      RegionEntity,
      JobEntity,
      IndustryEntity,
      SearchPreferenceEntity,
    ]),
    MailingModule,
    LoggerModule,
  ],
  providers: [
    AuthService,
    RedisService,
    InjectUserInterceptor,
    // Admin
    AdminAuthService,
    AdminTFAStrategy,
    AdminJwtStrategy,
    AdminLoginStrategy,
    AdminRefreshStrategy,
    AdminRecoverStrategy,
    // User
    UserAuthService,
    UserTFAStrategy,
    UserJwtStrategy,
    UserLoginStrategy,
    UserRefreshStrategy,
    UserRecoverStrategy,
    UserRegistrationStrategy,
    ConfirmPasswordGuard,
    UserWsGuard,
    // LinkedIn
    LinkedInOauthGuard,
    LinkedInRegistrationOauthGuard,
    LinkedInStrategy,
    LinkedInRegistrationStrategy,
    // Google
    GoogleStrategy,
    GoogleOauthGuard,
    GoogleRegistrationStrategy,
    GoogleRegistrationOauthGuard,

    //Validators
    LocationIdValidator,
    JobIdValidator,
    IndustryIdValidator,
    //Search Preference
    // SearchPreferenceService,
  ],
  exports: [
    AuthService,
    AdminAuthService,
    UserAuthService,
    InjectUserInterceptor,
    UserTFAStrategy,
    AdminTFAStrategy,
    JwtModule,
  ],
  controllers: [AdminAuthController, UserAuthController],
})
export class AuthModule {}
