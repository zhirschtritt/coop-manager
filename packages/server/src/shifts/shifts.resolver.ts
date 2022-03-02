import {Inject} from '@nestjs/common';
import {Args, Mutation, Resolver, Query, GraphQLISODateTime, ResolveField, Parent} from '@nestjs/graphql';
import {Member, Shift} from '@prisma/client';
import {MemberEntity} from '../memberships';
import {PrismaService, PRISMA_SERVICE} from '../prisma';
import {
  AssignShiftCommandResponse,
  AssignShiftCommandEntity,
  UnassignShiftCommandResponse,
  UnassignShiftCommand,
} from './Commands';
import {ShiftAssignmentEntity} from './shift-assignment.entity';
import {TermEntity} from './shift-term.entity';
import {ShiftEntity} from './shift.entity';

import {ShiftsService} from './shifts.service';

@Resolver(() => ShiftEntity)
export class ShiftsResolver {
  constructor(
    private readonly shiftService: ShiftsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
  ) {}

  @Query(() => ShiftEntity)
  async getShiftById(@Args('id') id: string) {
    return await this.prisma.shift.findUnique({where: {id}});
  }

  @Query(() => [ShiftEntity])
  async getShifts(
    @Args('from', {type: () => GraphQLISODateTime, nullable: true}) from?: Date,
    @Args('to', {type: () => GraphQLISODateTime, nullable: true}) to?: Date,
  ): Promise<Shift[]> {
    return await this.prisma.shift.findMany({where: {startsAt: {gte: from}, endsAt: {gte: to}}});
  }

  @ResolveField(() => [MemberEntity])
  async members(@Parent() {id}: ShiftEntity): Promise<Member[]> {
    return await this.prisma.member.findMany({where: {shiftAssignments: {every: {shiftId: id}}}});
  }

  @ResolveField(() => TermEntity)
  async term(@Parent() shift: ShiftEntity) {
    if (shift.termId) {
      return await this.prisma.shiftTerm.findUnique({
        where: {id: shift.termId},
      });
    }
    return null;
  }

  @ResolveField(() => [ShiftAssignmentEntity])
  async shiftAssignments(@Parent() shift: ShiftEntity) {
    return await this.prisma.shiftAssignment.findMany({
      where: {shiftId: shift.id},
    });
  }

  @Mutation(() => AssignShiftCommandResponse)
  async assignShift(
    @Args('assignShiftCommand') cmd: AssignShiftCommandEntity,
  ): Promise<AssignShiftCommandResponse> {
    return await this.shiftService.assignShiftToMember(cmd);
  }

  @Mutation(() => UnassignShiftCommandResponse)
  async unassignShift(
    @Args('unassignShiftCommand') cmd: UnassignShiftCommand,
  ): Promise<UnassignShiftCommandResponse> {
    return await this.shiftService.unassignShiftToMember(cmd);
  }
}
