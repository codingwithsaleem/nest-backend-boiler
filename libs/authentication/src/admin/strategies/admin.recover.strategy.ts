import { AuthService } from '@app/authentication/auth.service';
import { RecoverDto } from '@app/authentication/dtos/Recover.dto';
import { InvalidTokenException } from '@app/authentication/exceptions/auth.exceptions';
import { JwtAction, JwtRecoverPayload } from '@app/authentication/types/auth.types';
import { AdminEntity, AdminRepository } from '@app/database';
import { ValidationException } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { hash } from 'bcrypt';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AdminRecoverStrategy extends PassportStrategy(
  Strategy,
  'AdminRecoverStrategy',
) {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly userRepository: AdminRepository,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: authService.createJwtOptions().secret,
      passReqToCallback: true,
    });
  }

  /**
   *
   * @param request
   * @param payload
   */
  async validate(request: Request, payload: JwtRecoverPayload): Promise<AdminEntity> {
    // The validation pipe being executed after the guard, we have to do the validation manually here
    const dto: RecoverDto = request.body;
    await validateOrReject(dto).catch(err => {
      throw new ValidationException(err);
    });
    if (
      !payload ||
      payload.targetType !== AdminEntity.AUTH_ENTITY_NAME ||
      payload.action !== JwtAction.RECOVER
    ) {
      throw new InvalidTokenException();
    }
    return await this.userRepository.update(
      { id: payload.targetId },
      { password: await hash(dto.password, 10) },
    );
  }
}
