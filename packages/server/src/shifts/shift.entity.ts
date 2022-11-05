import {Shift as ShiftCommon, ShiftSlot} from '@bikecoop/common';
import {Field, ObjectType} from '@nestjs/graphql';
import {Shift} from '@prisma/client';
import {DateTimeResolver, JSONObjectResolver} from 'graphql-scalars';

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

  @Field(() => [JSONObjectResolver])
  slots!: ShiftSlot[];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftCommon = new ShiftEntity();
