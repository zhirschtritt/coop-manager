import {MemberLevel, MembershipType as MembershipTypeCommon} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {MembershipType} from '@prisma/client';
import {MemberEntity} from '../members/member.entity';
import {MembershipEntity} from './membership.entity';

@ObjectType()
export class MembershipTypeEntity implements MembershipType {
  @Field(() => ID)
  id!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  level!: MemberLevel;

  @Field(() => [MemberEntity])
  members?: MemberEntity[];

  @Field(() => [MembershipEntity])
  memberships?: MembershipEntity[];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const m: MembershipTypeCommon = new MembershipTypeEntity();
