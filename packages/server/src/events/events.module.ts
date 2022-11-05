import { Module, FactoryProvider } from '@nestjs/common';

import { PrismaModule } from '../prisma';
import { CommandHandler } from './CommandHandler';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';
import {
  MembershipCreatedHandler,
  MembershipStartedHandler,
  ShiftAssignedEventHandler,
  ShiftUnassignedEventHandler,
} from './PostEventHandlers';

export const EVENT_HANDLERS = Symbol('event-handlers');

const eventHandlers: FactoryProvider = {
  provide: EVENT_HANDLERS,
  useFactory: (...handlers) => handlers,
  inject: [
    ShiftAssignedEventHandler,
    ShiftUnassignedEventHandler,
    MembershipCreatedHandler,
    MembershipStartedHandler,
  ],
};

@Module({
  providers: [
    EventsService,
    EventsResolver,
    ShiftAssignedEventHandler,
    ShiftUnassignedEventHandler,
    MembershipCreatedHandler,
    MembershipStartedHandler,
    eventHandlers,
    CommandHandler,
  ],
  imports: [PrismaModule],
  exports: [CommandHandler, EventsService],
})
export class EventsModule {}
