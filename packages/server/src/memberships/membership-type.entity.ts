import {MemberLevel, MembershipType} from '@bikecoop/common';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MembershipEntity} from './membership.entity';
import {MemberEntity} from './member.entity';

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
  @JoinTable({
    name: 'memberships',
    joinColumn: {name: 'membership_type_id', referencedColumnName: 'id'},
    inverseJoinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
  })
  members?: MembershipEntity[];
}
