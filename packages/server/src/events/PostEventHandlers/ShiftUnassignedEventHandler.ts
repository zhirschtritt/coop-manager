import {CoopEventTypes, ShiftUnassignedEvent} from '@bikecoop/common';
import {Injectable} from '@nestjs/common';

import {Transaction} from '../interfaces';
import {EventHandler} from './EventHandler';

@Injectable()
export class ShiftUnassignedEventHandler extends EventHandler<ShiftUnassignedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.SHIFT_UNASSIGNED]));
  }

  async handle(event: ShiftUnassignedEvent, transaction: Transaction): Promise<void> {
    await transaction.shiftAssignment.delete({where: {id: event.data.shiftAssignmentId}});
  }
}
