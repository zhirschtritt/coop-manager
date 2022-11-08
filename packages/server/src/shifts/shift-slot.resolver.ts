import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PRISMA_SERVICE, PrismaService } from '../prisma';
import { ShiftAssignmentEntity } from './shift-assignment.entity';
import { ShiftSlotEntity } from './shift-slot.entity';

@Resolver(() => ShiftSlotEntity)
export class ShiftSlotResolver {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Query(() => ShiftSlotEntity)
  async shift(@Args('id') id: string) {
    return await this.prisma.shiftSlot.findUniqueOrThrow({ where: { id } });
  }

  @ResolveField(() => [ShiftAssignmentEntity])
  async shiftAssignments(@Parent() shiftSlot: ShiftSlotEntity) {
    return await this.prisma.shiftAssignment.findMany({
      where: {
        shiftSlotId: shiftSlot.id,
      },
    });
  }
}
