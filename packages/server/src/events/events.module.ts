import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsResolver} from './events.resolver';
import {CoopEventEntity} from './coop-event.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ShiftAssignedEventHandler} from './PostEventSubscribers';

@Module({
  providers: [EventsService, EventsResolver, ShiftAssignedEventHandler],
  imports: [TypeOrmModule.forFeature([CoopEventEntity])],
})
export class EventsModule {}
