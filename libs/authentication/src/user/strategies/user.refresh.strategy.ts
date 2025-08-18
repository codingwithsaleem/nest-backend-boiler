import { InvalidTokenException } from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtLoginPayload } from '@app/authentication/types/auth.types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';
import { UserEntity, UserRepository } from '@app/database';

@Injectable()
export class UserRefreshStrategy extends PassportStrategy(
  Strategy,
  'UserRefreshStrategy',
) {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authService.createJwtOptions().secret,
      passReqToCallback: true,
    });
  }

  /**
   * Validate user refresh token
   * @param req Request
   * @param payload Decrypted JWT payload
   * @returns User if success
   * @throws If token is invalid
   */
  async validate(req: Request, payload: JwtLoginPayload) {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();
    if (
      !refreshToken ||
      !payload ||
      payload.targetType !== UserEntity.AUTH_ENTITY_NAME ||
      payload.action !== JwtAction.LOGIN
    ) {
      throw new InvalidTokenException();
    }
    const user = await this.userRepository
      .findOneOrFail({ id: payload.targetId })
      .catch(() => {
        throw new InvalidTokenException('User not found');
      });
    if (!user.refreshToken || !compare(refreshToken, user.refreshToken)) {
      throw new InvalidTokenException();
    }
    return user;
  }
}
