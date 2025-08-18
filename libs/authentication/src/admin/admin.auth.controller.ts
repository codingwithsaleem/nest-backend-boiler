import { AdminAuthService } from '@app/authentication/admin/admin.auth.service';
import {
  Admin,
  AdminJWT,
} from '@app/authentication/admin/decorators/admin.auth.decorators';
import { AdminLoginGuard } from '@app/authentication/admin/guards/admin.login.guard';
import { AdminRecoverGuard } from '@app/authentication/admin/guards/admin.recover.guard';
import { AdminRefreshGuard } from '@app/authentication/admin/guards/admin.refresh.guard';
import { Public } from '@app/authentication/decorators/public.decorator';
import { EmailDto } from '@app/authentication/dtos/Email.dto';
import { LoginDto } from '@app/authentication/dtos/Login.dto';
import { RecoverDto } from '@app/authentication/dtos/Recover.dto';
import {
  AdminRequest,
  AuthTokens,
  AuthTokensWithTFWords,
} from '@app/authentication/types/auth.types';
import { TokenDto } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Controller('auth/admin')
@ApiExcludeController()
export class AdminAuthController {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly authService: AdminAuthService) {}

  /**
   * Log as admin
   * @param req
   * @param dto
   * @dev DTO is used in the passport strategy
   * @returns Access and refresh tokens
   */
  @Post('login')
  @Public()
  @UseGuards(AdminLoginGuard)
  @HttpCode(200)
  async logAdmin(@Req() req: AdminRequest, @Body() dto: LoginDto): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }

  /**
   * Send a user account recovery email
   * @param dto
   */
  @Put('recover')
  @Public()
  async sendRecoverEmail(@Body() dto: EmailDto): Promise<void> {
    await this.authService.sendRecoverEmail(dto.email);
  }

  /**
   * Recover a user
   * @param req
   * @param dto
   * @dev DTO is used in the passport strategy
   * @returns Access and refresh tokens
   */
  @Post('recover')
  @Public()
  @UseGuards(AdminRecoverGuard)
  async recoverUser(
    @Req() req: AdminRequest,
    @Body() dto: RecoverDto,
  ): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }

  /**
   * Validate admin's two-factor authentication (TFA)
   * @param req
   * @param dto
   * @dev The admin must have the basic JWT access tokens and TFA enabled
   * @returns Access and refresh tokens
   */
  @Post('tfa')
  @AdminJWT()
  @HttpCode(200)
  async TfAuth(@Req() req: AdminRequest, @Body() dto: TokenDto): Promise<AuthTokens> {
    return await this.authService.loginWithTwoFa(req.user, dto.token);
  }

  /**
   * Generate QRcode used to retrieve the tokens necessary for TFA
   * @param req
   * @param res
   * @returns A QRcode used to retrieve the tokens necessary for TFA
   */
  @Get('tfa/generate')
  @AdminJWT()
  async generate2fa(@Req() req: AdminRequest, @Res() res: Response): Promise<void> {
    const otpAuthUrl = await this.authService.generateTwoFaSecret(req.user);
    return this.authService.pipeQrCodeStream(res, otpAuthUrl);
  }

  /**
   * Enable admin's two-factor authentication (TFA)
   * @param req
   * @param dto
   * @returns Access and refresh tokens with TFA recovery words
   */
  @Post('tfa/on')
  @AdminJWT()
  @HttpCode(200)
  async turnOn2fa(
    @Req() req: AdminRequest,
    @Body() dto: TokenDto,
  ): Promise<AuthTokensWithTFWords> {
    return await this.authService.turnOnTwoFa(req.user, dto.token);
  }

  /**
   * Disable admin's two-factor authentication (TFA)
   * @param req
   */
  @Post('tfa/off')
  @Admin()
  @HttpCode(200)
  async turnOff2fa(@Req() req: AdminRequest): Promise<void> {
    return await this.authService.turnOffTwoFa(req.user);
  }

  /**
   * Logout admin
   * @param req
   */
  @Get('logout')
  @Admin()
  @HttpCode(200)
  async logoutAdmin(@Req() req: AdminRequest): Promise<void> {
    return await this.authService.logout(req.user);
  }

  /**
   * Refresh expired admin access token
   * @param req
   * @returns New access and refresh tokens
   */
  @Get('refresh')
  @Public()
  @UseGuards(AdminRefreshGuard)
  @HttpCode(200)
  async refreshAdmin(@Req() req: AdminRequest): Promise<AuthTokens> {
    return await this.authService.generateTokens(req.user);
  }
}
