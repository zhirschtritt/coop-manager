import {Member} from '@bikecoop/common';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity({name: 'members'})
export class MemberEntity implements Member {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column('email')
  email!: string;

  @Column('first_name')
  firstName!: string;

  @Column('last_name')
  lastName!: string;

  @CreateDateColumn('created_at')
  createdAt!: Date

  @UpdateDateColumn('updated_at')
  updatedAt!: Date

  /** Not in use yet, could contain other denormalized member information in the future */
  @Column({name: 'meta', type: 'jsonb'})
  meta!: Record<string, unknown>;
}
