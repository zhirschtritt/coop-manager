import {Inject} from '@nestjs/common';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Membership, Shift} from '@prisma/client';

import {MembershipEntity} from '../memberships';
import {PrismaService, PRISMA_SERVICE} from '../prisma';

import {MemberEntity} from './member.entity';

@Resolver(() => MemberEntity)
export class MemberResolver {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Query(() => [MemberEntity])
  async getMembers(): Promise<MemberEntity[]> {
    return await this.prisma.member.findMany({});
  }

  @ResolveField(() => [MembershipEntity])
  async memberships(@Parent() {id}: MemberEntity): Promise<Membership[]> {
    const res = await this.prisma.member.findUnique({where: {id}, include: {memberships: true}, rejectOnNotFound: true});

    return res.memberships ?? [];
  }

  @ResolveField(() => [MembershipEntity])
  async shifts(@Parent() {id}: MemberEntity): Promise<Shift[]> {
    return await this.prisma.shift.findMany({where: {shiftAssignments: {
      every: {
        memberId: id,
      },
    }}});
  }
}
