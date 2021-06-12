import {Args, Resolver, Query} from '@nestjs/graphql';
import {CoopEventScopeType} from '../../../common/src';
import {CoopEventEntity} from './coop-event.entity';
import {EventsService} from './events.service';

@Resolver(() => CoopEventEntity)
export class EventsResolver {
  constructor(private readonly eventService: EventsService) {}

  @Query(() => [CoopEventEntity])
  async eventsByScopeType(@Args('scopeType') scopeType: CoopEventScopeType) {
    return await this.eventService.getEventsByScopeType(scopeType);
  }
}
