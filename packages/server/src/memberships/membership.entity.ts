import {Membership, MembershipStatus} from '@bikecoop/common';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {MemberEntity} from './member.entity';

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

  @OneToMany(() => MemberEntity, (member) => member.memberships)
  members?: MemberEntity[];
}
