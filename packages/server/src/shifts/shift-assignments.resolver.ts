import {Inject} from '@nestjs/common';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Member, Shift, ShiftAssignment} from '@prisma/client';

import {MemberEntity} from '../memberships';
import {PrismaService, PRISMA_SERVICE} from '../prisma';
import {ShiftAssignmentEntity} from './shift-assignment.entity';
import {ShiftEntity} from './shift.entity';

@Resolver(() => ShiftAssignmentEntity)
export class ShiftAssignmentsResolver {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Query(() => [ShiftAssignmentEntity])
  async getAssignments(): Promise<ShiftAssignment[]> {
    return await this.prisma.shiftAssignment.findMany({});
  }

  @ResolveField(() => [MemberEntity])
  async member(@Parent() {memberId}: ShiftAssignmentEntity): Promise<Member> {
    return await this.prisma.member.findUnique({
      where: {id: memberId},
      rejectOnNotFound: true,
    });
  }

  @ResolveField(() => [ShiftEntity])
  async shift(@Parent() {shiftId}: ShiftAssignmentEntity): Promise<Shift> {
    return await this.prisma.shift.findUnique({
      where: {id: shiftId},
      rejectOnNotFound: true,
    });
  }
}
