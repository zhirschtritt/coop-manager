import {Args, Field, InputType, Mutation, Resolver} from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {Actor} from '@bikecoop/common';
import {CoopEventEntity} from '../events/coop-event.entity';
import {ShiftsService} from './shifts.service';

@InputType()
export class AssignShiftCommand {
  @Field(() => String)
  shiftId!: string;

  @Field(() => String)
  memberId!: string;

  @Field(() => GraphQLJSON)
  actor!: Actor;
}

@Resolver()
export class ShiftsResolver {
  constructor(private readonly shiftService: ShiftsService) {}

  @Mutation(() => CoopEventEntity)
  async assignShift(@Args('assignShiftCommand') cmd: AssignShiftCommand) {
    const res = await this.shiftService.assignShiftToMember(cmd);

    return res;
  }
}
