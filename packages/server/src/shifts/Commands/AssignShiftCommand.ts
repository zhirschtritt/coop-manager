import {InputType, Field, ObjectType} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {Actor, AssignShiftCommand} from '@bikecoop/common';

@InputType()
export class AssignShiftCommandEntity implements AssignShiftCommand {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  slot!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => GraphQLJSON)
  actor!: Actor;

  @Field(() => String)
  requestId!: string;
}

@ObjectType()
export class AssignShiftCommandResponse {
  @Field(() => [String])
  events!: string[];
}
