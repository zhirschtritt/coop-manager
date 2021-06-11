import {
  Actor,
  allSettledAndThrow,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  ShiftAssignedEvent,
} from '@bikecoop/common';
import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

import {CoopEventEntity} from '../events/coop-event.entity';
import {MemberEntity} from '../memberships';
import {ShiftEntity} from './shift.entity';

@Injectable()
export class ShiftsService {
  constructor(@InjectConnection() private connection: Connection) {}

  async assignShiftToMember(shiftId: string, memberId: string, actor: Actor) {
    return await this.connection.transaction(async (tx) => {
      const [[shift], [member]] = await allSettledAndThrow([
        tx.findByIds(ShiftEntity, [shiftId]),
        tx.findByIds(MemberEntity, [memberId]),
      ]);

      if (!shift) throw new Error(`no shift with id: ${shiftId}`);
      if (!member) throw new Error(`no member with id: ${memberId}`);

      const event: EventDataFrom<ShiftAssignedEvent> = {
        happenedAt: new Date(),
        scopeType: CoopEventScopeTypes.SHIFT,
        scopeId: shift.id,
        type: CoopEventTypes.SHIFT_ASSIGNED,
        data: {
          shiftId: shift.id,
          memberId: member.id,
          actor,
        },
      };

      return await tx.create(CoopEventEntity, event);
    });
  }
}
