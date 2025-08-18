import { UserEntity } from '@app/database/entities/User.entity';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserEmailAutomation {
  @PrimaryKey({ type: 'varchar', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Property({ type: 'string', nullable: false })
  preference: 'Daily' | 'Weekly' | 'Monthly' | 'Never';

  @Property({ type: 'date', nullable: true })
  lastEmailSent: Date;

  @Property({ type: 'array', nullable: true })
  sendJobIds: string[];
}
