import {BaseEvent} from '@bikecoop/common';
import {Field, GraphQLISODateTime, ID, Int, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class CoopEventEntity implements BaseEvent {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  sequenceId!: number;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  scopeType!: string;

  @Field(() => ID)
  scopeId!: string;

  @Field(() => GraphQLISODateTime)
  happenedAt!: Date;

  @Field(() => GraphQLISODateTime)
  insertedAt!: Date;

  @Field(() => GraphQLJSON)
  data!: Record<string, any>;
}
