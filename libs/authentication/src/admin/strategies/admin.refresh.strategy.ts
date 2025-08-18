import { InvalidTokenException } from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtLoginPayload } from '@app/authentication/types/auth.types';
import { AdminEntity, AdminRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';

@Injectable()
export class AdminRefreshStrategy extends PassportStrategy(
  Strategy,
  'AdminRefreshStrategy',
) {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authService.createJwtOptions().secret,
      passReqToCallback: true,
    });
  }

  /**
   * Validate admin refresh token
   * @param req Request
   * @param payload Decrypted JWT payload
   * @returns Admin if success
   * @throws If token is invalid
   */
  async validate(req: Request, payload: JwtLoginPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    if (
      !refreshToken ||
      !payload ||
      payload.targetType !== AdminEntity.AUTH_ENTITY_NAME ||
      payload.action !== JwtAction.LOGIN
    ) {
      throw new InvalidTokenException();
    }
    const admin = await this.adminRepository
      .findOneOrFail({ id: payload.targetId })
      .catch(() => {
        throw new InvalidTokenException('Admin not found');
      });
    if (!admin.refreshToken || !compare(refreshToken, admin.refreshToken)) {
      throw new InvalidTokenException();
    }
    return admin;
  }
}
