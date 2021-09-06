import {Args, Mutation, Resolver, Query, GraphQLISODateTime, ResolveField, Parent} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {LessThanOrEqual, MoreThanOrEqual, Repository} from 'typeorm';
import {MemberEntity} from '../memberships';
import {
  AssignShiftCommandResponse,
  AssignShiftCommand,
  UnassignShiftCommandResponse,
  UnassignShiftCommand,
} from './Commands';
import {ShiftEntity} from './shift.entity';

import {ShiftsService} from './shifts.service';

@Resolver(() => ShiftEntity)
export class ShiftsResolver {
  constructor(
    private readonly shiftService: ShiftsService,
    @InjectRepository(ShiftEntity)
    private readonly shiftRepo: Repository<ShiftEntity>,
  ) {}

  @Query(() => ShiftEntity)
  async getShiftById(@Args('id', {type: () => String}) id: string) {
    return await this.shiftRepo.findOne(id);
  }

  @ResolveField(() => [MemberEntity])
  async getMembers(@Parent() shift: ShiftEntity) {
    const res = await this.shiftRepo.findOne(shift.id, {
      select: ['id'],
      relations: ['members'],
    });
    return res?.members || [];
  }

  @Mutation(() => AssignShiftCommandResponse)
  async assignShift(
    @Args('assignShiftCommand') cmd: AssignShiftCommand,
  ): Promise<AssignShiftCommandResponse> {
    return await this.shiftService.assignShiftToMember(cmd);
  }

  @Mutation(() => UnassignShiftCommandResponse)
  async unassignShift(
    @Args('unassignShiftCommand') cmd: UnassignShiftCommand,
  ): Promise<UnassignShiftCommandResponse> {
    return await this.shiftService.unassignShiftToMember(cmd);
  }

  @Query(() => [ShiftEntity])
  async getShifts(
    @Args('from', {type: () => GraphQLISODateTime, nullable: true}) from?: Date,
    @Args('to', {type: () => GraphQLISODateTime, nullable: true}) to?: Date,
  ): Promise<ShiftEntity[]> {
    return await this.shiftRepo.find({
      where: {
        startsAt: MoreThanOrEqual(from),
        endsAt: LessThanOrEqual(to),
      },
    });
  }
}
