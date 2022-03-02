import {Membership as MembershipCommon, MembershipStatus} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {Membership} from '@prisma/client';

import {MemberEntity} from '../members/member.entity';
import {MembershipTypeEntity} from './membership-type.entity';

@ObjectType()
export class MembershipEntity implements Membership {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => String)
  membershipTypeId!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime)
  endDate!: Date;

  // TODO: create enum? type
  @Field(() => String)
  status!: MembershipStatus;

  @Field(() => MemberEntity)
  member?: MemberEntity;

  @Field(() => MembershipTypeEntity)
  memberShipType?: MembershipTypeEntity;
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const m: MembershipCommon = new MembershipEntity();
