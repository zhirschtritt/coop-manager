import { BaseEvent, CoopEventScopeType, CoopEventType } from '@bikecoop/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

@ObjectType()
export class CoopEventEntity implements BaseEvent {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  sequenceId!: number;

  @Field(() => String)
  type!: CoopEventType;

  @Field(() => String)
  scopeType!: CoopEventScopeType;

  @Field(() => ID)
  scopeId!: string;

  @Field(() => DateTimeResolver)
  happenedAt!: Date;

  @Field(() => DateTimeResolver)
  insertedAt!: Date;

  @Field(() => JSONObjectResolver)
  data!: Record<string, any>;
}
