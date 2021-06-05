import {MemberLevel, MembershipType} from '@bikecoop/common';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MemberEntity} from './member.entity';
import {MembershipEntity} from './membership.entity';

@Entity({name: 'membership_types'})
export class MembershipTypeEntity implements MembershipType {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({name: 'created_at', type: 'timestamptz'})
  createdAt!: Date;

  @Column({name: 'name'})
  name!: string;

  @Column({name: 'level'})
  level!: MemberLevel;

  @Column({name: 'length_in_days', type: 'integer'})
  lengthInDays!: number;

  @ManyToMany(() => MemberEntity, (member) => member.memberShipTypes)
  members?: MemberEntity[];

  @OneToMany(() => MembershipEntity, (membership) => membership.memberShipType)
  memberships?: MembershipEntity;
}
