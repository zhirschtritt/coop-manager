import { MemberLevel, MembershipType as MembershipTypeCommon } from '@bikecoop/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { MembershipType } from '@prisma/client';
import { DateTimeResolver, UUIDResolver } from 'graphql-scalars';
import { MemberEntity } from '../members/member.entity';
import { MembershipEntity } from './membership.entity';

@ObjectType()
export class MembershipTypeEntity implements MembershipType {
  @Field(() => UUIDResolver)
  id!: string;

  @Field(() => DateTimeResolver)
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
