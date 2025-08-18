import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * Interceptor that adds a timeout to incoming requests.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  /**
   * Creates an instance of TimeoutInterceptor.
   * @param timeout - The timeout value in milliseconds.
   */
  constructor(private readonly timeout: number) {}

  /**
   * Intercepts an incoming request and adds a timeout to it.
   * @param context - The execution context of the request.
   * @param next - The next handler in the pipeline.
   * @returns An observable that times out after the specified duration.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.timeout),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
