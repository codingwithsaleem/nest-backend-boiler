import { AdminTFAGuard } from '@app/authentication/admin/guards/admin.2fa.guard';
import { AdminJwtGuard } from '@app/authentication/admin/guards/admin.jwt.guard';
import { CanActivate, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

/**
 *
 */
export function AdminJWT() {
  return applyDecorators(
    UseGuards(AdminJwtGuard),
    //  ApiExcludeEndpoint(), TODO: En fonction de l'env
    ApiBearerAuth('Admin'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/**
 *
 * @param guards
 */
export function Admin(
  guards: ClassConstructor<CanActivate> | ClassConstructor<CanActivate>[] = [],
) {
  const _guards = Array.isArray(guards) ? guards : [guards];
  return applyDecorators(
    UseGuards(AdminTFAGuard, ..._guards),
    //  ApiExcludeEndpoint(), TODO: En fonction de l'env
    ApiBearerAuth('Admin'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/**
 *
 */
export function AdminControllerGuard() {
  return applyDecorators(
    UseGuards(AdminTFAGuard),
    //  ApiExcludeEndpoint(), TODO: En fonction de l'env
    ApiBearerAuth('Admin'),
  );
}
