import {CoopEventTypes, ShiftUnassignedEvent} from '@bikecoop/common';
import {EntityManager, EventSubscriber} from 'typeorm';

import {ShiftAssignmentEntity} from '../../shifts/shift-assignment.entity';
import {PostEventSubscriber} from './PostEventSubscriber';

@EventSubscriber()
export class ShiftUnassignedEventHandler extends PostEventSubscriber<ShiftUnassignedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.SHIFT_UNASSIGNED]));
  }

  async handle(event: ShiftUnassignedEvent, transaction: EntityManager): Promise<void> {
    await transaction.delete(ShiftAssignmentEntity, event.data.shiftAssignmentId);
  }
}
