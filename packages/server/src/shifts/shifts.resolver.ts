import {
  Args,
  Mutation,
  Resolver,
  Query,
  GraphQLISODateTime,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MemberEntity} from '../memberships';
import {AssignShiftCommandRespone, AssignShiftCommand} from './Commands';
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
      relations: ['members'],
    });
    return res?.members || [];
  }

  @Mutation(() => AssignShiftCommandRespone)
  async assignShift(
    @Args('assignShiftCommand') cmd: AssignShiftCommand,
  ): Promise<AssignShiftCommandRespone> {
    return await this.shiftService.assignShiftToMember(cmd);
  }

  @Query(() => [ShiftEntity])
  async getShifts(
    @Args('from', {type: () => GraphQLISODateTime}) from: Date,
    @Args('to', {type: () => GraphQLISODateTime}) to: Date,
  ): Promise<ShiftEntity[]> {
    return await this.shiftRepo
      .createQueryBuilder('shift')
      .where('shift.startsAt >= :from', {from})
      .andWhere('shift.endsAt <= :to', {to})
      .getMany();
  }
}
