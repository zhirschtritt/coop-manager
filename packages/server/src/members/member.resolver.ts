import {Inject} from '@nestjs/common';
import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Member, Membership, Shift, Prisma} from '@prisma/client';
import {id} from 'date-fns/locale';

import {MemberEntity, MembershipEntity} from '../memberships';
import {PrismaService, PRISMA_SERVICE} from '../prisma';
import {CreateNewMember, UpdateMember} from './commands';

@Resolver(() => MemberEntity)
export class MemberResolver {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Query(() => [MemberEntity])
  async getMembers(
    @Args('membershipLevel', {nullable: true}) membershipLevel?: string,
  ): Promise<MemberEntity[]> {
    let where: Prisma.MemberWhereInput = {};

    if (membershipLevel) {
      where = {
        ...where,
        memberships: {
          some: {
            membershipType: {
              level: membershipLevel,
            },
          },
        },
      };
    }

    return await this.prisma.member.findMany({
      where,
    });
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
