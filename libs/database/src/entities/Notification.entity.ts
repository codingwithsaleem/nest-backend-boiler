import { UserEntity } from '@app/database/entities/User.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import {
  NotificationStatus,
  NotificationType,
} from '@app/database/enums/Notifications.enums';
import { NotificationRepository } from '@app/database/repositories/Notification.repository';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  Index,
  JsonType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'notification',
  customRepository: () => NotificationRepository,
})
export class NotificationEntity<T = any> extends BaseEntity {
  [EntityRepositoryType]?: NotificationRepository;

  /**
   * Owner
   */
  @ManyToOne(() => UserEntity, {
    name: 'user',
    onDelete: 'cascade',
  })
  @Index()
  user!: UserEntity;

  /**
   * Notification type
   */
  @Enum({ name: 'type', type: 'varchar', items: () => NotificationType })
  @Index()
  type!: NotificationType;

  /**
   * Notification status
   */
  @Enum({ name: 'status', type: 'varchar', items: () => NotificationStatus })
  @Index()
  status: NotificationStatus = NotificationStatus.UNREAD;

  /**
   * Notification content
   */
  @Property({ name: 'data', type: JsonType })
  data: T;

  /****************************** METHODS ************************************/
  /**
   * Set notification status as read
   */
  public markAsRead() {
    this.status = NotificationStatus.READ;
  }
}
