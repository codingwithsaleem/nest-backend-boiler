import { ISO31661Alpha2 } from '@app/shared';
import { Profile } from 'passport';

export class LinkedInProfile implements Profile {
  provider: string;
  id: string;
  displayName: string;
  username?: string | undefined;
  givenName: string;
  familyName: string;
  middleName?: string;
  email: string;
  _json: {
    locale: {
      country: ISO31661Alpha2;
    };
  };
}
