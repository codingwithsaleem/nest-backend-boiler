import { InvalidTokenException } from '@app/authentication/exceptions/auth.exceptions';
import { JwtLoginPayload, JwtAction } from '@app/authentication/types/auth.types';
import { UserRepository, UserEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '@app/authentication/auth.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'UserJwtStrategy') {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly userRepository: UserRepository,
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
  async validate(payload: JwtLoginPayload): Promise<UserEntity> {
    if (
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
    return user;
  }
}
