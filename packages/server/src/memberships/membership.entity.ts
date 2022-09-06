import {Membership as MembershipCommon, MembershipStatus} from '@bikecoop/common';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Membership} from '@prisma/client';
import {DateTimeResolver} from 'graphql-scalars';

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

  @Field(() => DateTimeResolver)
  startDate!: Date;

  @Field(() => DateTimeResolver)
  endDate!: Date;

  @Field(() => String)
  status!: MembershipStatus;

  @Field(() => MemberEntity)
  member?: MemberEntity;

  @Field(() => MembershipTypeEntity, {nullable: true})
  membershipType?: MembershipTypeEntity;
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const m: MembershipCommon = new MembershipEntity();
