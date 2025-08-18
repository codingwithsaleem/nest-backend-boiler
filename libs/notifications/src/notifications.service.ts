import { FindPaginateResponse, UserEntity } from '@app/database';
import { NotificationEntity } from '@app/database/entities/Notification.entity';
import { NotificationStatus } from '@app/database/enums/Notifications.enums';
import { NotificationRepository } from '@app/database/repositories/Notification.repository';
import { LoggerService } from '@app/logger';
import { NOTIFICATIONS_USER_TOPIC } from '@app/notifications/constants/notifications.constants';
import { RedisService } from '@app/redis';
import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationsService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly repository: NotificationRepository,
    private readonly redis: RedisService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Get user notifications, sorted by date
   * @param user Current user
   * @param limit Pagination limit - default 10
   * @param page Pagination page - default 0
   * @returns The list of notifications found
   */
  public async get(
    user: UserEntity,
    limit = 10,
    page = 0,
  ): Promise<FindPaginateResponse<NotificationEntity>> {
    return await this.repository.findPaginated(
      { user },
      { orderBy: { createdAt: 'DESC' }, limit, page },
    );
  }

  /**
   * Read a notification.
   * @param user Current user
   * @param id Notification id
   * @returns Updated notification
   */
  public async read(user: UserEntity, id: string): Promise<NotificationEntity> {
    return await this.repository.update(
      { id, user },
      { status: NotificationStatus.READ },
    );
  }

  /**
   * Unread a notification.
   * @param user Current user
   * @param id Notification id
   * @returns Updated notification
   */
  public async unread(user: UserEntity, id: string): Promise<NotificationEntity> {
    return await this.repository.update(
      { id, user },
      { status: NotificationStatus.UNREAD },
    );
  }

  /**
   * Read all notifications.
   * @param user Current user
   * @returns Updated notifications
   */
  public async readAll(user: UserEntity): Promise<NotificationEntity[]> {
    const notifications = await this.repository.find(
      { user, status: NotificationStatus.UNREAD },
      { fields: ['status'] },
    );
    notifications.forEach(notif => (notif.status = NotificationStatus.READ));
    await this.repository.flush();
    return notifications;
  }

  /**
   * Subscribe to user's server sent event (SSE) stream
   * Bind Redis event to it
   * @param user User to subscribe
   * @returns An Observable that emits real-time user's notifications
   */
  public bind(user: UserEntity): Observable<NotificationEntity> {
    const channel = NOTIFICATIONS_USER_TOPIC(user.id);
    return new Observable<NotificationEntity>(observer => {
      const messageHandler = (subscribedChannel: string, message: string) => {
        if (subscribedChannel === channel) {
          try {
            const data = JSON.parse(message) as NotificationEntity;
            observer.next(data);
          } catch (error) {
            this.logger.warn('Invalid user notification', error, message);
          }
        }
      };
      this.redis.subscriber.subscribe(channel);
      this.redis.subscriber.on('message', messageHandler);
      return async () => {
        if (['connect', 'ready'].includes(this.redis.subscriber.status)) {
          await this.redis.subscriber.unsubscribe(channel);
        }
        this.redis.subscriber.removeListener('message', messageHandler);
      };
    });
  }

  /**
   * Emit a notification to the user's channel
   * @param receiverId Target user id
   * @param notification Notification to publish
   */
  public async emit(receiverId: string, notification: NotificationEntity): Promise<void> {
    await this.redis.publisher.publish(
      NOTIFICATIONS_USER_TOPIC(receiverId),
      JSON.stringify(notification),
    );
  }

  /**
   * Create and save a user notification and emit it to it's channel
   * @param receiverId Target user id
   * @param data Notification data
   * @returns Created notification
   */
  public async createAndEmit<T = any>(
    receiverId: string,
    data: RequiredEntityData<NotificationEntity<T>>,
  ): Promise<NotificationEntity<T>> {
    const notification = await this.repository.save(data);
    await this.emit(receiverId, notification);
    return notification;
  }
}
