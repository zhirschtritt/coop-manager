import {
  Args,
  Mutation,
  Resolver,
  Query,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AssignShiftCommandRespone, AssignShiftCommand} from './Commands';
import {ShiftEntity} from './shift.entity';

import {ShiftsService} from './shifts.service';

@Resolver()
export class ShiftsResolver {
  constructor(
    private readonly shiftService: ShiftsService,
    @InjectRepository(ShiftEntity)
    private readonly shiftRepo: Repository<ShiftEntity>,
  ) {}

  @Mutation(() => AssignShiftCommandRespone)
  async assignShift(@Args('assignShiftCommand') cmd: AssignShiftCommand) {
    return await this.shiftService.assignShiftToMember(cmd);
  }

  @Query(() => [ShiftEntity])
  async getShifts(
    @Args('from', {type: () => GraphQLISODateTime}) from: Date,
    @Args('to', {type: () => GraphQLISODateTime}) to: Date,
  ) {
    return await this.shiftRepo
      .createQueryBuilder('shift')
      .where('shift.startsAt >= :from', {from})
      .andWhere('shift.endsAt <= :to', {to})
      .leftJoinAndSelect('shift.members', 'member')
      .getMany();
  }
}
