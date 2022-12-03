import { CoopEvent, CoopEventScopeType, EventDataFrom } from '@bikecoop/common';
import { Inject, Injectable } from '@nestjs/common';
import { CoopEvent as PrismaCoopEvent } from '@prisma/client';
import { Transaction } from '../interfaces';

import { PRISMA_SERVICE, PrismaService } from '../prisma';

@Injectable()
export class EventsService {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prisma: PrismaService,
  ) {}

  async create<T extends CoopEvent>(data: EventDataFrom<T>, tx?: Transaction): Promise<T> {
    const db = tx ?? this.prisma;
    const event = await db.coopEvent.create({ data });

    return event as unknown as T;
  }

  async getEventsByScopeId(
    scopeType: CoopEventScopeType,
    scopeId: string,
    tx?: Transaction,
  ): Promise<PrismaCoopEvent[]> {
    const db = tx ?? this.prisma;
    return await db.coopEvent.findMany({ where: { scopeType, scopeId } });
  }
}
