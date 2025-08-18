import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class SocialMediaEmbeddable {
  @Property({ name: 'linkedin', type: 'varchar', nullable: true })
  linkedin?: string;

  @Property({ name: 'github', type: 'varchar', nullable: true })
  github?: string;

  @Property({ name: 'twitter', type: 'varchar', nullable: true })
  twitter?: string;

  @Property({ name: 'facebook', type: 'varchar', nullable: true })
  facebook?: string;

  @Property({ name: 'instagram', type: 'varchar', nullable: true })
  instagram?: string;
}
