import {Inject} from '@nestjs/common';
import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Member, Membership, Shift} from '@prisma/client';

import {MemberEntity, MembershipEntity} from '../memberships';
import {PrismaService, PRISMA_SERVICE} from '../prisma';
import {CreateNewMember, UpdateMember} from './commands';

@Resolver(() => MemberEntity)
export class MemberResolver {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Query(() => [MemberEntity])
  async getMembers(): Promise<MemberEntity[]> {
    return await this.prisma.member.findMany({});
  }

  @ResolveField(() => [MembershipEntity])
  async memberships(@Parent() {id}: MemberEntity): Promise<Membership[]> {
    const res = await this.prisma.member.findUnique({
      where: {id},
      include: {memberships: true},
      rejectOnNotFound: true,
    });

    return res.memberships ?? [];
  }

  @ResolveField(() => [MembershipEntity])
  async shifts(@Parent() {id}: MemberEntity): Promise<Shift[]> {
    return await this.prisma.shift.findMany({
      where: {
        shiftAssignments: {
          every: {
            memberId: id,
          },
        },
      },
    });
  }

  @Mutation(() => MemberEntity)
  async newMember(@Args('member') member: CreateNewMember): Promise<Member> {
    return await this.prisma.member.create({data: member});
  }

  @Mutation(() => MemberEntity)
  async updateMember(@Args('member') member: UpdateMember): Promise<Member> {
    return await this.prisma.member.update({data: member, where: {id: member.id}});
  }
}
