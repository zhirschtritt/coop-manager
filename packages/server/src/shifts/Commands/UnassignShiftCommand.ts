import {Actor, UnassignShiftCommand as UnassignShiftCommandOAS} from '@bikecoop/common';
import {Field, InputType, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

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
  @Field(() => [String])
  events!: string[];
}
