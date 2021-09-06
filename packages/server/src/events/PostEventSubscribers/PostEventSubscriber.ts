import {EntityManager, EntitySubscriberInterface, InsertEvent} from 'typeorm';
import {CoopEvent, CoopEventType} from '@bikecoop/common';
import {CoopEventEntity} from '../coop-event.entity';

export abstract class PostEventSubscriber<T extends CoopEvent> implements EntitySubscriberInterface<T> {
  constructor(private readonly wantedEventTypes: Set<CoopEventType>) {}

  listenTo() {
    return CoopEventEntity;
  }

  async afterInsert(event: InsertEvent<CoopEventEntity>) {
    if (this.wantedEventTypes.has(event.entity.type as any)) {
      await this.handle(event.entity, event.manager);
    }
  }
  abstract handle(event: CoopEventEntity, transaction: EntityManager): Promise<void>;
}
