import { Field, ObjectType } from '@nestjs/graphql';

import type { ShiftAssignment, ShiftSlot, ShiftSlotData } from '@bikecoop/common';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import { ShiftAssignmentEntity } from './shift-assignment.entity';

@ObjectType()
export class ShiftSlotEntity implements ShiftSlot {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  shiftId!: string;

  @Field(() => DateTimeResolver)
  endDate!: Date;

  @Field(() => JSONObjectResolver)
  data!: ShiftSlotData;

  @Field(() => [ShiftAssignmentEntity], { defaultValue: [] })
  shiftAssignments!: ShiftAssignment[];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftSlot = new ShiftSlotEntity();
