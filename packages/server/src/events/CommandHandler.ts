import {CoopEvent} from '@bikecoop/common';
import {Inject, Injectable} from '@nestjs/common';

import {PRISMA_SERVICE, PrismaService} from '../prisma';
import {Transaction} from './interfaces';
import {EventHandler, ShiftAssignedEventHandler, ShiftUnassignedEventHandler} from './PostEventHandlers';

export type CommandResponse<T> = T & Record<'events', string[]>;
export type CommandResponseRaw<T> = T & Record<'events', CoopEvent[]>;

@Injectable()
export class CommandHandler {
  private readonly eventHandlers: EventHandler[];
  constructor(
    @Inject(PRISMA_SERVICE)
    protected readonly prisma: PrismaService,
    assignedEventHandler: ShiftAssignedEventHandler,
    unassignedEventHandler: ShiftUnassignedEventHandler,
  ) {
    this.eventHandlers = [assignedEventHandler, unassignedEventHandler];
  }

  async handleInTransaction<TRes>(
    handleCommand: (tx: Transaction) => Promise<CommandResponseRaw<TRes>>,
  ): Promise<CommandResponse<TRes>> {
    return await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`begin isolation level SERIALIZABLE`;


      const res = await handleCommand(tx);

      const results = await Promise.allSettled(
        res.events.flatMap(async (e) => {
          return Promise.allSettled(
            this.eventHandlers.map(async (handler) => {
              if (handler.wants(e)) {
                // TODO: try/catch log error and rethrow
                return await handler.handle(e, tx);
              }
            }),
          );
        }),
      );

      for (const result of results) {
        if (result.status === 'rejected') {
          throw Object.assign(new Error('Error handling event'), result);
        }
      }

      return {
        ...res,
        events: res.events.map((e) => e.id),
      };
    });
  }
}
