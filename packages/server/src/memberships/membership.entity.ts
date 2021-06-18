import {Membership, MembershipStatus} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {MemberEntity} from '../members/member.entity';
import {MembershipTypeEntity} from './membership-type.entity';

@ObjectType()
@Entity({name: 'memberships'})
export class MembershipEntity implements Membership {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id!: string;

  @Field(() => String)
  @Column({name: 'member_id'})
  memberId!: string;

  @Field(() => String)
  @Column({name: 'membership_type_id'})
  membershipTypeId!: string;

  @Field(() => GraphQLISODateTime)
  @Column({name: 'start_date'})
  startDate!: Date;

  @Field(() => GraphQLISODateTime)
  @Column({name: 'end_date'})
  endDate!: Date;

  // TODO: create enum? type
  @Field(() => String)
  @Column({name: 'status'})
  status!: MembershipStatus;

  @Field(() => MemberEntity)
  @ManyToOne(() => MemberEntity, (member) => member.memberships, {
    primary: true,
  })
  @JoinColumn({name: 'member_id'})
  member?: MemberEntity;

  @Field(() => MembershipTypeEntity)
  @ManyToOne(
    () => MembershipTypeEntity,
    (memberShipType) => memberShipType.memberships,
    {primary: true},
  )
  @JoinColumn({name: 'membership_type_id'})
  memberShipType?: MembershipTypeEntity;
}
