import { Embeddable, Property } from '@mikro-orm/core';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@Embeddable({ abstract: true })
@ObjectType({ isAbstract: true })
export abstract class BaseEmbeddable {
  /**
   * Creation date
   */
  @Property()
  @Field(() => GraphQLISODateTime)
  createdAt: Date = new Date();
}
