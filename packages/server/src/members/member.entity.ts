import {Member as MemberCommon} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';
import {Member, Prisma} from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';
import {MembershipTypeEntity, MembershipEntity} from '../memberships';
import {ShiftEntity} from '../shifts/shift.entity';

@ObjectType()
export class MemberEntity implements Member {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  /** Not in use yet, could contain other denormalized member information in the future */
  @Field(() => GraphQLJSON)
  meta!: Prisma.JsonValue;

  @Field(() => [MembershipTypeEntity])
  membershipTypes?: MembershipTypeEntity[];

  @Field(() => [MembershipEntity])
  memberships?: MembershipEntity[];

  @Field(() => [ShiftEntity])
  shifts?: ShiftEntity[];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const m: MemberCommon = new MemberEntity();
