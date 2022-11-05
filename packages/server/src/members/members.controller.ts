import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService, PRISMA_SERVICE } from '../prisma';

@Controller('members')
export class MembersController {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return await this.prisma.member.findMany();
  }
}
