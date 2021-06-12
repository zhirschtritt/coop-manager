import {
  allSettledAndThrow,
  chainUuidV5,
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
import {AssignShiftCommand} from './shifts.resolver';

@Injectable()
export class ShiftsService {
  static readonly SHIFT_ASSIGNED_EVENT_NS =
    'dbdd3ca6-c759-4c59-9215-e41763e47129';

  constructor(@InjectConnection() private connection: Connection) {}

  async assignShiftToMember(cmd: AssignShiftCommand) {
    return await this.connection.transaction('SERIALIZABLE', async (tx) => {
      const [[shift], [member]] = await allSettledAndThrow([
        tx.findByIds(ShiftEntity, [cmd.shiftId]),
        tx.findByIds(MemberEntity, [cmd.memberId]),
      ]);

      if (!shift) throw new Error(`no shift with id: ${cmd.shiftId}`);
      if (!member) throw new Error(`no member with id: ${cmd.memberId}`);

      const event: EventDataFrom<ShiftAssignedEvent> = {
        id: chainUuidV5(
          ShiftsService.SHIFT_ASSIGNED_EVENT_NS,
          shift.id,
          member.id,
        ),
        happenedAt: new Date(),
        scopeType: CoopEventScopeTypes.SHIFT,
        scopeId: shift.id,
        type: CoopEventTypes.SHIFT_ASSIGNED,
        data: {
          shiftId: shift.id,
          memberId: member.id,
          actor: cmd.actor,
        },
      };

      const existingEvent = await tx.findOne(CoopEventEntity, {
        where: {id: event.id},
      });

      if (existingEvent) {
        return existingEvent;
      }

      return await tx.insert(CoopEventEntity, event);
    });
  }
}
