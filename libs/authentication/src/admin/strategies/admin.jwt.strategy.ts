import { InvalidTokenException } from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtLoginPayload } from '@app/authentication/types/auth.types';
import { AdminEntity, AdminRepository } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'AdminJwtStrategy') {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authService.createJwtOptions().secret,
    });
  }

  /**
   * Validate admin access token.
   * @param payload Decrypted JWT payload
   * @returns Admin if success
   * @throws If token is invalid
   */
  async validate(payload: JwtLoginPayload): Promise<AdminEntity> {
    if (
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
    return admin;
  }
}
