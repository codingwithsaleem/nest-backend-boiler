import { AuthenticatedEntity } from '@app/database/entities/abstract/Authenticated.entity';
import { AdminRepository } from '@app/database/repositories/Admin.repository';
import { Entity, EntityRepositoryType } from '@mikro-orm/core';

@Entity({
  tableName: 'admin',
  customRepository: () => AdminRepository,
})
export class AdminEntity extends AuthenticatedEntity {
  [EntityRepositoryType]?: AdminRepository;

  static readonly AUTH_ENTITY_NAME = 'AuthEntity';
}
