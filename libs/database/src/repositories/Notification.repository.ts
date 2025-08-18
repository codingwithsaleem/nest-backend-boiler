import { NotificationEntity } from '@app/database/entities/Notification.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class NotificationRepository extends CrudRepository<NotificationEntity> {}
