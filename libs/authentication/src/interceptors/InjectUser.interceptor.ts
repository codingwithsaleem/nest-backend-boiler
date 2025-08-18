import { CustomRequestContext } from '@app/shared/classes/CustomRequestContext.class';
import { RequestContext } from '@medibloc/nestjs-request-context';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

/**
 * This interceptor will inject the user into the custom request context.
 * This is useful for validators that needs to access the current user.
 */
@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  /**
   *
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const customContext: CustomRequestContext = RequestContext.get();
    if (request) {
      customContext.user = request.user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      customContext.user = ctx.getContext().req.user;
    }
    return next.handle();
  }
}
