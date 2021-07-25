import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MembershipEntity} from '../memberships';

import {MemberEntity} from './member.entity';

@Resolver(() => MemberEntity)
export class MemberResolver {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {}

  @Query(() => [MemberEntity])
  async getMembers(): Promise<MemberEntity[]> {
    return await this.memberRepo.find();
  }

  @ResolveField(() => [MembershipEntity])
  async getMemberships(
    @Parent() member: MemberEntity,
  ): Promise<MembershipEntity[]> {
    const res = await this.memberRepo.findOne(member.id, {
      select: ['id'],
      relations: ['memberships'],
    });

    return res?.memberships ?? [];
  }
}
