import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MembershipType } from '@prisma/client';

import { CommandResponse } from '../interfaces';
import { PRISMA_SERVICE, PrismaService } from '../prisma';
import { CreateMembershipCommand } from './commands/CreateMembershipCommand';
import { MembershipTypeEntity } from './membership-type.entity';
import { MembershipEntity } from './membership.entity';
import { MembershipsService } from './memberships.service';

@Resolver(() => MembershipEntity)
export class MembershipResolver {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly membershipService: MembershipsService,
  ) {}

  @Query(() => [MembershipEntity])
  async getMemberships(): Promise<MembershipEntity[]> {
    return (await this.prisma.membership.findMany({})) as any;
  }

  @ResolveField(() => MembershipTypeEntity)
  async membershipType(@Parent() { id }: MembershipEntity): Promise<MembershipType> {
    return await this.prisma.membershipType.findFirstOrThrow({
      where: {
        memberships: { every: { id } },
      },
    });
  }

  @Mutation(() => CommandResponse)
  async createMembership(@Args('createMembership') cmd: CreateMembershipCommand) {
    return await this.membershipService.createMembership(cmd);
  }
}
