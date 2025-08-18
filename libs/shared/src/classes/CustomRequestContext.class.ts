import { UserEntity } from '@app/database';
import { RequestContext } from '@medibloc/nestjs-request-context';

export class CustomRequestContext extends RequestContext {
  user: UserEntity;
}
