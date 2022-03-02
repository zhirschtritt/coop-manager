import {CoopEventScopeType} from '@bikecoop/common';
import {Inject, Injectable} from '@nestjs/common';

import {PrismaService, PRISMA_SERVICE} from '../prisma';

@Injectable()
export class EventsService {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prisma: PrismaService,
  ) {}

  async getEventsByScopeType(scopeType: CoopEventScopeType) {
    return await this.prisma.coopEvent.findMany({where: {scopeType}});
  }
}
