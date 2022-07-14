import {Actor, CoopEvent, UnassignShiftCommand as UnassignShiftCommandOAS} from '@bikecoop/common';
import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {JSONObjectResolver} from 'graphql-scalars';

@InputType()
export class UnassignShiftCommand implements UnassignShiftCommandOAS {
  @Field(() => String)
  requestId!: string;

  @Field(() => String)
  shiftAssignmentId!: string;

  @Field(() => JSONObjectResolver)
  actor!: Actor;

  @Field(() => String)
  reason?: string;
}

@ObjectType()
export class UnassignShiftCommandResponse {
  @Field(() => [JSONObjectResolver])
  events!: CoopEvent[];
}
