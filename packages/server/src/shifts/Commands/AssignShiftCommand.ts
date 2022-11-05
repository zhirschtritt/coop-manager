import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Actor, AssignShiftCommand, CoopEvent } from '@bikecoop/common';
import { JSONObjectResolver } from 'graphql-scalars';

@InputType()
class SlotDefinitionInput {
  @Field(() => String, { nullable: true })
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => JSONObjectResolver)
  data!: Record<string, unknown>;
}

@InputType()
export class AssignShiftCommandEntity implements AssignShiftCommand {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => JSONObjectResolver)
  actor!: Actor;

  @Field(() => String)
  requestId!: string;

  @Field(() => SlotDefinitionInput)
  slot!: { id?: string; name: string; data: Record<string, unknown> };
}

@ObjectType()
export class AssignShiftCommandResponse {
  @Field(() => [JSONObjectResolver])
  events!: CoopEvent[];
}
