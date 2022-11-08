import { Shift as ShiftCommon, ShiftSlot } from '@bikecoop/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Shift } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';
import { ShiftSlotEntity } from './shift-slot.entity';

@ObjectType()
export class ShiftEntity implements Shift {
  @Field(() => String)
  id!: string;

  @Field(() => DateTimeResolver)
  startsAt!: Date;

  @Field(() => DateTimeResolver)
  endsAt!: Date;

  @Field(() => String)
  termId!: string | null;

  @Field(() => [ShiftSlotEntity])
  slots!: ShiftSlot[];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftCommon = new ShiftEntity();
