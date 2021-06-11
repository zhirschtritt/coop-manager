import {ShiftAssignedEvent} from '@bikecoop/common';
import {EntityManager, EventSubscriber} from 'typeorm';
import {ShiftAssignmentEntity} from '../../shifts/shift-assignment.entity';
import {CoopEventEntity} from '../coop-event.entity';
import {PostEventSubscriber} from './PostEventSubscriber';

@EventSubscriber()
export class ShiftAssignedEventHandler extends PostEventSubscriber<ShiftAssignedEvent> {
  async handle(
    event: CoopEventEntity<ShiftAssignedEvent>,
    transaction: EntityManager,
  ): Promise<void> {
    await transaction.create(ShiftAssignmentEntity, {
      memberId: event.data.memberId,
      shiftId: event.data.shiftId,
      createdBy: event.id,
      meta: {
        createdByActor: event.data.actor,
      },
    });
  }
}
