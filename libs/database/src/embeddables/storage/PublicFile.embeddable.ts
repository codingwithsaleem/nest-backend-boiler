import { BaseEmbeddable } from '@app/database/embeddables/abstract/Base.embeddable';
import { getPublicFileUrl } from '@app/shared';
import { Embeddable, Property, wrap } from '@mikro-orm/core';

@Embeddable()
export class PublicFileEmbeddable extends BaseEmbeddable {
  /**
   * AWS S3 bucket key.
   */
  @Property()
  key!: string;

  /**
   * File content type (Mime).
   */
  @Property()
  contentType!: string;

  /**
   * File access url.
   */
  @Property()
  url!: string;

  /**
   * File size.
   */
  @Property({ nullable: true })
  size?: number;

  /**
   * Original file name.
   */
  @Property({ nullable: true })
  originalname?: string; // must be similar to Multer.File originalname property

  /**
   * Url from which the file was downloaded
   */
  @Property({ nullable: true })
  sourceUrl?: string;

  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(partial: Partial<PublicFileEmbeddable>) {
    super();
    Object.assign(this, partial);
    this.url = getPublicFileUrl() + '/' + partial.key;
  }

  /**
   * Converts the PublicFile object to a JSON representation.
   * @param args - Additional arguments to pass to the underlying toObject method.
   * @returns The JSON representation of the PublicFile object.
   */
  public toJSON(...args: any[]): Record<string, any> {
    this.url = getPublicFileUrl() + '/' + this.key;
    return wrap(this, true).toObject(...args);
  }
}
