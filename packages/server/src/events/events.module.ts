import {Module} from '@nestjs/common';

import {PrismaModule} from '../prisma';
import {CommandHandler} from './CommandHandler';
import {EventsResolver} from './events.resolver';
import {EventsService} from './events.service';
import {ShiftAssignedEventHandler, ShiftUnassignedEventHandler} from './PostEventHandlers';

export const EVENT_HANDLERS = Symbol('event-handlers');

@Module({
  providers: [
    EventsService,
    EventsResolver,
    ShiftAssignedEventHandler,
    ShiftUnassignedEventHandler,
    CommandHandler,
    {
      provide: EVENT_HANDLERS,
      useFactory: (assigned, unassigned) => [assigned, unassigned],
      inject: [ShiftAssignedEventHandler, ShiftUnassignedEventHandler],
    },
  ],
  imports: [PrismaModule],
  exports: [CommandHandler],
})
export class EventsModule {}
