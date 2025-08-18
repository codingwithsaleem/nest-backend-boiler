import { InjectUserInterceptor } from '@app/authentication/interceptors/InjectUser.interceptor';
import { UserJwtGuard } from '@app/authentication/user/guards/user.jwt.guard';
import { UserTFAGuard } from '@app/authentication/user/guards/user.tfa.guard';
import { CanActivate, UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

/**
 *
 * @param guards
 */
export function UserJWT(
  guards: ClassConstructor<CanActivate> | ClassConstructor<CanActivate>[] = [],
) {
  const _guards = Array.isArray(guards) ? guards : [guards];
  return applyDecorators(
    UseGuards(UserJwtGuard, ..._guards),
    UseInterceptors(InjectUserInterceptor),
    ApiBearerAuth('User'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/**
 *
 * @param guards
 */
export function User(
  guards: ClassConstructor<CanActivate> | ClassConstructor<CanActivate>[] = [],
) {
  const _guards = Array.isArray(guards) ? guards : [guards];
  return applyDecorators(
    UseGuards(UserTFAGuard, ..._guards),
    UseInterceptors(InjectUserInterceptor),
    ApiBearerAuth('User'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/**
 *
 * @param guards
 */
export function UserControllerGuard(
  guards: ClassConstructor<CanActivate> | ClassConstructor<CanActivate>[] = [],
) {
  const _guards = Array.isArray(guards) ? guards : [guards];
  return applyDecorators(
    UseGuards(UserTFAGuard, ..._guards),
    UseInterceptors(InjectUserInterceptor),
    ApiBearerAuth('User'),
  );
}
