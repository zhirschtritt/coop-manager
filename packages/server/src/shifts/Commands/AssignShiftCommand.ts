import {InputType, Field, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {Actor, ShiftAssignedEvent} from '@bikecoop/common';
import {CoopEventEntity} from '../../events/coop-event.entity';

@InputType()
export class AssignShiftCommand {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => GraphQLJSON)
  actor!: Actor;
}

@ObjectType()
export class AssignShiftCommandRespone {
  @Field(() => CoopEventEntity)
  event!: ShiftAssignedEvent;
}
