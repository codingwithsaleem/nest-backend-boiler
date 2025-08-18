import { UserEntity } from '@app/database';
import { SocialMediaEmbeddable } from '@app/database/embeddables/SocialMedia.embeddable';
import { ISO31661Alpha2 } from '@app/shared';

export class UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: SocialMediaEmbeddable;
  countryCode: ISO31661Alpha2;

  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.socialMedia = entity.socialMedia;
    this.countryCode = entity.countryCode;
  }
}
