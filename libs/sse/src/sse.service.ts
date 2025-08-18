import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent } from 'rxjs';

@Injectable()
export class SseService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(private readonly emitter: EventEmitter2) {}

  /**
   *
   * @param eventName
   */
  public subscribe(eventName: string) {
    return fromEvent(this.emitter, eventName);
  }

  /**
   *
   * @param eventName
   * @param data
   */
  public emit(eventName: string, data: any) {
    return this.emitter.emit(eventName, { data });
  }
}
