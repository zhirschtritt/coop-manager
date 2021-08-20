import {InputType, Field, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Actor,
  ShiftAssignedEvent,
  AssignShiftCommand as AssignShiftCommandOAS,
  EventDataFrom,
} from '@bikecoop/common';
import {CoopEventEntity} from '../../events/coop-event.entity';

@InputType()
export class AssignShiftCommand implements AssignShiftCommandOAS {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => GraphQLJSON)
  actor!: Actor;

  @Field(() => String)
  requestId!: string;
}

@ObjectType()
export class AssignShiftCommandResponse {
  @Field(() => CoopEventEntity)
  event!: EventDataFrom<ShiftAssignedEvent>;
}
