import { Args, Resolver, Query } from '@nestjs/graphql';
import { CoopEventScopeType } from '@bikecoop/common';
import { CoopEventEntity } from './coop-event.entity';
import { EventsService } from './events.service';

@Resolver(() => CoopEventEntity)
export class EventsResolver {
  constructor(private readonly eventService: EventsService) {}

  @Query(() => [CoopEventEntity])
  async eventsByScopeType(
    @Args('scopeType') scopeType: CoopEventScopeType,
    @Args('scopeId') scopeId: string,
  ) {
    return await this.eventService.getEventsByScopeId(scopeType, scopeId);
  }
}
