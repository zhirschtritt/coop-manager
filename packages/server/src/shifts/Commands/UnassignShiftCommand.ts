import {
  Actor,
  EventDataFrom,
  ShiftUnassignedEvent,
  UnassignShiftCommand as UnassignShiftCommandOAS,
} from '@bikecoop/common';
import {Field, InputType, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import {CoopEventEntity} from '../../events/coop-event.entity';

@InputType()
export class UnassignShiftCommand implements UnassignShiftCommandOAS {
  @Field(() => String)
  requestId!: string;

  @Field(() => String)
  shiftAssignmentId!: string;

  @Field(() => GraphQLJSON)
  actor!: Actor;

  @Field(() => String)
  reason?: string;
}

@ObjectType()
export class UnassignShiftCommandResponse {
  @Field(() => CoopEventEntity)
  event!: EventDataFrom<ShiftUnassignedEvent>;
}
