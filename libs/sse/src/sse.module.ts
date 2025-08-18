import { SseService } from '@app/sse/sse.service';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
