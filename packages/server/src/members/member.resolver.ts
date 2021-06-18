import {Query, Resolver} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {MemberEntity} from './member.entity';

@Resolver()
export class MemberResolver {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {}


  @Query(() => [MemberEntity])
  async getMembers(): Promise<MemberEntity[]> {
    return await this.memberRepo
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.memberships', 'membership')
      .leftJoinAndSelect('member.membershipTypes', 'membershipType')
      .getMany();
  }
}
