import {Member as MemberCommon} from '@bikecoop/common';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Member, Prisma} from '@prisma/client';
import {DateTimeResolver, JSONObjectResolver} from 'graphql-scalars';
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

  @Field(() => DateTimeResolver)
  createdAt!: Date;

  @Field(() => DateTimeResolver)
  updatedAt!: Date;

  /** Not in use yet, could contain other denormalized member information in the future */
  @Field(() => JSONObjectResolver)
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
