import {ShiftAssignment as ShiftAssignmentCommon} from '@bikecoop/common';
import {Field, ObjectType} from '@nestjs/graphql';
import {Member, Shift, ShiftAssignment} from '@prisma/client';
import {ShiftEntity} from './shift.entity';
import {MemberEntity} from '../memberships';

@ObjectType()
export class ShiftAssignmentEntity implements ShiftAssignment {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => String)
  shiftId!: string;

  @Field(() => MemberEntity)
  member!: Member;

  @Field(() => ShiftEntity)
  shift!: Shift;

  @Field(() => String)
  createdBy!: string;

  @Field(() => String)
  slot!: string;
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftAssignmentCommon = new ShiftAssignmentEntity();
