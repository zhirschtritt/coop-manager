import {Field, ObjectType} from '@nestjs/graphql';
import {ShiftTerm} from '@prisma/client';
import {differenceInDays} from 'date-fns';

import type {ShiftTerm as TermCommon} from '@bikecoop/common';
import {DateTimeResolver} from 'graphql-scalars';

@ObjectType()
export class TermEntity implements ShiftTerm {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => DateTimeResolver)
  startDate!: Date;

  @Field(() => DateTimeResolver)
  endDate!: Date;

  @Field(() => Number)
  get lengthInDays() {
    return differenceInDays(this.startDate, this.endDate);
  }
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: TermCommon = new TermEntity();
