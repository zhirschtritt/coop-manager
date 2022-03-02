import {CoopEventTypes, ShiftAssignedEvent} from '@bikecoop/common';
import {EventHandler} from './EventHandler';
import {Transaction} from '../interfaces';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ShiftAssignedEventHandler extends EventHandler<ShiftAssignedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.SHIFT_ASSIGNED]));
  }

  async handle(event: ShiftAssignedEvent, transaction: Transaction): Promise<void> {
    await transaction.shiftAssignment.create({
      data: {
        id: event.data.shiftAssignmentId,
        memberId: event.data.memberId,
        shiftId: event.data.shiftId,
        createdBy: event.id,
        slot: event.data.slotInstance,
      },
    });
  }
}
