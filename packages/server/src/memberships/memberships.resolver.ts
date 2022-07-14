import {Inject} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CommandResponse} from '../interfaces';
import {PRISMA_SERVICE, PrismaService} from '../prisma';
import {CreateMembershipCommand} from './commands/CreateMembershipCommand';
import {MembershipEntity} from './membership.entity';
import {MembershipsService} from './memberships.service';

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

  @Mutation(() => CommandResponse)
  async createMembership(@Args('createMembership') cmd: CreateMembershipCommand) {
    return await this.membershipService.createMembership(cmd);
  }
}
