import { Public } from '@app/authentication/decorators/public.decorator';
import { CreateUserDto } from '@app/authentication/dtos/CreateUser.dto';
import { EmailDto } from '@app/authentication/dtos/Email.dto';
import { LoginDto } from '@app/authentication/dtos/Login.dto';
import { RecoverDto } from '@app/authentication/dtos/Recover.dto';
import {
  AuthTokens,
  AuthTokensWithTFWords,
  UserRequest,
} from '@app/authentication/types/auth.types';
import { User, UserJWT } from '@app/authentication/user/decorators/user.auth.decorators';
import { GoogleOauthGuard } from '@app/authentication/user/guards/user.google.guard';
import { GoogleRegistrationOauthGuard } from '@app/authentication/user/guards/user.googleRegistration.guard';
import { LinkedInOauthGuard } from '@app/authentication/user/guards/user.linkedin.guard';
import { LinkedInRegistrationOauthGuard } from '@app/authentication/user/guards/user.linkedinRegistration.guard';
import { UserLoginGuard } from '@app/authentication/user/guards/user.login.guard';
import { UserRecoverGuard } from '@app/authentication/user/guards/user.recover.guard';
import { UserRefreshGuard } from '@app/authentication/user/guards/user.refresh.guard';
import { UserAuthService } from '@app/authentication/user/user.auth.service';
import { TokenDto } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Controller('auth/user')
export class UserAuthController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly authService: UserAuthService) {}

  /**
   * Log as user
   * @param req - The request object.
   * @param dto - The login data transfer object.
   * @dev DTO is used in the passport strategy
   * @returns Access and refresh tokens
   */
  @Post('login')
  @Public()
  @UseGuards(UserLoginGuard)
  @HttpCode(200)
  async logUser(@Req() req: UserRequest, @Body() dto: LoginDto): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }

  /**
   * Register a user
   * @param dto - The registration data transfer object.
   * @dev DTO is used in the passport strategy
   * @returns Access and refresh tokens
   */
  @Post('register')
  @Public()
  async registerUser(@Body() dto: CreateUserDto): Promise<void> {
    return await this.authService.register(dto);
  }

  /**
   * Verify the user account creation via the URL sent by email
   * @param token - the jwt from url
   * @returns - AuthTokens
   */
  @Get('verify')
  @Public()
  async VerificationUrlRedirection(@Query('token') token: string): Promise<AuthTokens> {
    return this.authService.verify(token);
  }
  /**
   * Send a user account recovery email
   * @param dto - The email data transfer object.
   */
  @Put('recover')
  @Public()
  async sendRecoverEmail(@Body() dto: EmailDto): Promise<void> {
    await this.authService.sendRecoverEmail(dto.email);
  }

  /**
   * Recover a user
   * @param req - The request object
   * @param dto - The recover data transfer object
   * @dev DTO is used in the passport strategy
   * @returns Access and refresh tokens
   */
  @Post('recover')
  @Public()
  @UseGuards(UserRecoverGuard)
  async recoverUser(
    @Req() req: UserRequest,
    @Body() dto: RecoverDto,
  ): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }

  /**
   * Validate user's two-factor authentication (TFA)
   * @param req - The request object
   * @param dto - The token data transfer object
   * @dev The user must have the basic JWT access tokens and TFA enabled
   * @returns Access and refresh tokens
   */
  @Post('tfa')
  @UserJWT()
  @HttpCode(200)
  async TfAuth(@Req() req: UserRequest, @Body() dto: TokenDto): Promise<AuthTokens> {
    return await this.authService.loginWithTwoFa(req.user, dto.token);
  }

  /**
   * Generate QRcode used to retrieve the tokens necessary for TFA
   * @param req - The request object
   * @param res - The response object
   * @returns A QRcode used to retrieve the tokens necessary for TFA
   */
  @Get('tfa/generate')
  @UserJWT()
  async generate2fa(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    const otpAuthUrl = await this.authService.generateTwoFaSecret(req.user);
    return this.authService.pipeQrCodeStream(res, otpAuthUrl);
  }

  /**
   * Enable user's two-factor authentication (TFA)
   * @param req - The request object
   * @param dto - The token data transfer object
   * @returns Access and refresh tokens with TFA recovery words
   */
  @Post('tfa/on')
  @UserJWT()
  @HttpCode(200)
  async turnOn2fa(
    @Req() req: UserRequest,
    @Body() dto: TokenDto,
  ): Promise<AuthTokensWithTFWords> {
    return await this.authService.turnOnTwoFa(req.user, dto.token);
  }

  /**
   * Disable user's two-factor authentication (TFA)
   * @param req - The request object
   * @returns -
   */
  @Post('tfa/off')
  @User()
  @HttpCode(200)
  async turnOff2fa(@Req() req: UserRequest): Promise<void> {
    return await this.authService.turnOffTwoFa(req.user);
  }

  /**
   * Logout user
   * @param req - The request object
   * @returns -
   */
  @Get('logout')
  @User()
  @HttpCode(200)
  async logoutUser(@Req() req: UserRequest): Promise<void> {
    return await this.authService.logout(req.user);
  }

  /**
   * Refresh expired user access token
   * @param req - The request object
   * @returns New access and refresh tokens
   */
  @Get('refresh')
  @Public()
  @UseGuards(UserRefreshGuard)
  @HttpCode(200)
  async refreshUser(@Req() req: UserRequest): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }

  /******LinkedIn******/
  /**
   * The user's LinkedIn registration
   * @param req - The request object
   * @returns -
   */
  @Get('linkedin/register')
  @Public()
  @UseGuards(LinkedInRegistrationOauthGuard)
  async linkedInOAuthRegister(@Req() req: UserRequest): Promise<void> {}

  /**
   * The user's LinkedIn registration redirect
   * @param req - The request object
   * @param res - The response object
   * @returns -
   */
  @Get('linkedin/register/redirect')
  @Public()
  @UseGuards(LinkedInRegistrationOauthGuard)
  async linkedInOAuthRegisterRedirect(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.OAuthRedirection(req.user, res);
  }

  /**
   * The user's LinkedIn login
   * @param req - The request object
   */
  @Get('linkedin/login')
  @Public()
  @UseGuards(LinkedInOauthGuard)
  async linkedInAuth(@Req() req: UserRequest): Promise<void> {}

  /**
   * The user's LinkedIn login redirect
   * @param req - The request object
   * @param res - The response object
   */
  @Get('linkedin/login/redirect')
  @Public()
  @UseGuards(LinkedInOauthGuard)
  async linkedInRedirect(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (req.user.error) {
      this.authService.redirectToRegistration(res, req);
      return;
    }
    await this.authService.OAuthRedirection(req.user, res);
  }

  /******Google******/

  /**
   * The user's Google registration
   * @param req - The request object
   * @returns -
   */
  @Get('google/register')
  @Public()
  @UseGuards(GoogleRegistrationOauthGuard)
  async googleOAuthRegister(@Req() req: UserRequest): Promise<void> {}

  /**
   * The user's Google registration redirect
   * @param req - The request object
   * @param res - the response object
   * @returns -
   */
  @Get('google/register/redirect')
  @Public()
  @UseGuards(GoogleRegistrationOauthGuard)
  async googleOAuthRegisterRedirect(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.OAuthRedirection(req.user, res);
  }

  /**
   * The user's Google login
   * @param req - The request object
   * @returns -
   */
  @Get('google/login')
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req: UserRequest): Promise<void> {}

  /**
   * The user's Google login redirect
   * @param req - The request object
   * @param res - The response object
   * @returns -
   */
  @Get('google/login/redirect')
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleRedirect(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    if (req.user.error) {
      this.authService.redirectToRegistration(res, req);
      return;
    }
    await this.authService.OAuthRedirection(req.user, res);
  }
}
