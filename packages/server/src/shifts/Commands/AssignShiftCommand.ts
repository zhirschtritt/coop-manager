import {InputType, Field, ObjectType} from '@nestjs/graphql';
import {Actor, AssignShiftCommand, CoopEvent} from '@bikecoop/common';
import {JSONObjectResolver} from 'graphql-scalars';

@InputType()
export class AssignShiftCommandEntity implements AssignShiftCommand {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  slot!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => JSONObjectResolver)
  actor!: Actor;

  @Field(() => String)
  requestId!: string;
}

@ObjectType()
export class AssignShiftCommandResponse {
  @Field(() => [JSONObjectResolver])
  events!: CoopEvent[];
}
