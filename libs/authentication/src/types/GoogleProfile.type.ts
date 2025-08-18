import { ISO31661Alpha2 } from '@app/shared';

export class GoogleProfile {
  provider: string;
  displayName: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  _json: {
    locale: ISO31661Alpha2;
  };
}
