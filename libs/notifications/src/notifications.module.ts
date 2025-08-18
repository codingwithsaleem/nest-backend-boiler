import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NotificationEntity } from '@app/database/entities/Notification.entity';
import { RedisModule } from '@app/redis';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [RedisModule, MikroOrmModule.forFeature([NotificationEntity]), LoggerModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
