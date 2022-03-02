import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';
import {Shift} from '@prisma/client';
import {GraphQLJSONObject} from 'graphql-type-json';
import {Shift as ShiftCommon} from '@bikecoop/common';

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

  @Field(() => GraphQLJSONObject)
  slots!: ShiftCommon['slots'];
}

// type check only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s: ShiftCommon = new ShiftEntity();
