import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  /**
   * Entity main identifier
   */
  @PrimaryKey({ type: 'varchar', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  /**
   * Creation date
   */
  @Property({
    name: 'created_at',
    type: 'timestamp with time zone',
    defaultRaw: 'now()',
  })
  createdAt: Date = new Date();

  /**
   * Update date
   */
  @Property({
    name: 'updated_at',
    type: 'timestamp with time zone',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
