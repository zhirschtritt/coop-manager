import {CoopEventTypes, ShiftAssignedEvent} from '@bikecoop/common';
import {EntityManager, EventSubscriber} from 'typeorm';
import {ShiftAssignmentEntity} from '../../shifts/shift-assignment.entity';
import {CoopEventEntity} from '../coop-event.entity';
import {PostEventSubscriber} from './PostEventSubscriber';

@EventSubscriber()
export class ShiftAssignedEventHandler extends PostEventSubscriber<ShiftAssignedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.SHIFT_ASSIGNED]));
  }

  async handle(
    event: CoopEventEntity<ShiftAssignedEvent>,
    transaction: EntityManager,
  ): Promise<void> {
    await transaction.insert(ShiftAssignmentEntity, {
      id: event.data.shiftAssignmentId,
      memberId: event.data.memberId,
      shiftId: event.data.shiftId,
    });
  }
}
