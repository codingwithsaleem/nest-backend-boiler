import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class ExternalLinkEmbeddable {
  /**
   * Title of the article link
   */
  @Property({ name: 'title', type: 'varchar' })
  title: string;

  /**
   * Link's url
   */
  @Property({ name: 'url', type: 'varchar' })
  url: string;
}
