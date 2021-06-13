import {Membership, MembershipStatus} from '@bikecoop/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MemberEntity} from '../members/member.entity';
import {MembershipTypeEntity} from './membership-type.entity';

@Entity({name: 'memberships'})
export class MembershipEntity implements Membership {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Column({name: 'created_by'})
  createdBy!: string;

  @Column({name: 'member_id'})
  memberId!: string;

  @Column({name: 'membership_type_id'})
  membershipTypeId!: string;

  @Column({name: 'start_date'})
  startDate!: Date;

  @Column({name: 'end_date'})
  endDate!: Date;

  @Column({name: 'status'})
  status!: MembershipStatus;

  @ManyToOne(() => MemberEntity, (member) => member.memberships, {
    primary: true,
  })
  @JoinColumn({name: 'member_id'})
  member?: MemberEntity;

  @ManyToOne(
    () => MembershipTypeEntity,
    (memberShipType) => memberShipType.memberships,
    {primary: true},
  )
  @JoinColumn({name: 'membership_type_id'})
  memberShipType?: MembershipTypeEntity;
}
