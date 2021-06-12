import {EntityManager, EntitySubscriberInterface, InsertEvent} from 'typeorm';
import {CoopEvent, CoopEventType} from '@bikecoop/common';
import {CoopEventEntity} from '../coop-event.entity';

export abstract class PostEventSubscriber<T extends CoopEvent>
  implements EntitySubscriberInterface<T> {
  listenTo() {
    return CoopEventEntity;
  }

  constructor(private readonly wantedEventTypes: Set<CoopEventType>) {}

  async afterInsert(event: InsertEvent<CoopEventEntity<T>>) {
    if (this.wantedEventTypes.has(event.entity.type)) {
      await this.handle(event.entity, event.manager);
    }
  }
  abstract handle(
    event: CoopEventEntity<T>,
    transaction: EntityManager,
  ): Promise<void>;
}
