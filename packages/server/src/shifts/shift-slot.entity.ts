import { Field, ObjectType } from '@nestjs/graphql';

import type { ShiftSlot, ShiftSlotData } from '@bikecoop/common';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

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
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftSlot = new ShiftSlotEntity();
