import {
  allSettledAndThrow,
  chainUuidV5,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  InsertedBaseEventData,
  ShiftAssignedEvent,
} from '@bikecoop/common';
import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection, EntityManager} from 'typeorm';

import {CoopEventEntity} from '../events/coop-event.entity';
import {MemberEntity} from '../memberships';
import {AssignShiftCommand, AssignShiftCommandRespone} from './Commands';
import {ShiftEntity} from './shift.entity';

@Injectable()
export class ShiftsService {
  static readonly SHIFT_ASSIGNED_EVENT_NS =
    'dbdd3ca6-c759-4c59-9215-e41763e47129';
  static readonly SHIFT_ASSIGNMENT_NS = 'be577851-b6b5-4d02-8df7-553ef679e9c9';

  constructor(@InjectConnection() private connection: Connection) {}

  async assignShiftToMember(
    cmd: AssignShiftCommand,
  ): Promise<AssignShiftCommandRespone> {
    return await this.connection.transaction<AssignShiftCommandRespone>(
      'SERIALIZABLE',
      async (tx: EntityManager) => {
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
            shiftAssignmentId: chainUuidV5(
              ShiftsService.SHIFT_ASSIGNMENT_NS,
              shift.id,
              member.id,
            ),
          },
        };

        const existingEvent = await tx.findOne(CoopEventEntity, {
          where: {id: event.id},
        });

        if (existingEvent) {
          return {
            event: existingEvent,
          };
        }

        const {generatedMaps} = await tx.insert(CoopEventEntity, event);

        return {
          // the "generatedMaps" insert response gives us the persistance data (sequenceId, insertedAt)
          // so we don't have to read event back out from the db
          event: Object.assign(
            event,
            generatedMaps[0] as InsertedBaseEventData,
          ),
        };
      },
    );
  }
}
