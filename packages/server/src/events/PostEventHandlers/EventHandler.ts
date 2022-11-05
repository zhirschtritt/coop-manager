import { CoopEvent, CoopEventType } from '@bikecoop/common';
import { Transaction } from '../../interfaces';

export abstract class EventHandler<T extends CoopEvent = CoopEvent> {
  constructor(private readonly wantedEventTypes: Set<CoopEventType>) {}

  wants(event: CoopEvent) {
    return this.wantedEventTypes.has(event.type);
  }
  abstract handle(event: T, transaction: Transaction): Promise<void>;
}
