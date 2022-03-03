import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';
import {Shift} from '@prisma/client';
import {Shift as ShiftCommon} from '@bikecoop/common';
import {JSONObjectResolver} from 'graphql-scalars';

@ObjectType()
export class ShiftEntity implements Shift {
  @Field(() => String)
  id!: string;

  @Field(() => GraphQLISODateTime)
  startsAt!: Date;

  @Field(() => GraphQLISODateTime)
  endsAt!: Date;

  @Field(() => String)
  termId!: string | null;

  @Field(() => JSONObjectResolver)
  slots!: ShiftCommon['slots'];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftCommon = new ShiftEntity();
