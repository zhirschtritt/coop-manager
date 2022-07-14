import {CoopEvent} from '@bikecoop/common';
import {forwardRef, Inject, Injectable} from '@nestjs/common';

import {PRISMA_SERVICE, PrismaService} from '../prisma';
import {EVENT_HANDLERS} from './events.module';
import {Transaction} from '../interfaces';
import {EventHandler} from './PostEventHandlers';

export type CommandResponse<T> = T & Record<'events', CoopEvent[]>;

@Injectable()
export class CommandHandler {
  constructor(
    @Inject(PRISMA_SERVICE)
    protected readonly prisma: PrismaService,
    @Inject(forwardRef(() => EVENT_HANDLERS))
    private readonly eventHandlers: EventHandler[],
  ) {}

  async handleInTransaction<TRes>(
    handleCommand: (tx: Transaction) => Promise<CommandResponse<TRes>>,
  ): Promise<CommandResponse<TRes>> {
    return await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`begin isolation level SERIALIZABLE`;

      const res = await handleCommand(tx);

      const results = await Promise.allSettled(
        res.events.flatMap(async (e) => {
          return await Promise.allSettled(
            this.eventHandlers.map(async (handler) => {
              if (handler.wants(e)) {
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
        events: res.events,
      };
    });
  }
}
