import {
  allSettledAndThrow,
  chainUuidV5,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  InsertedBaseEventData,
  ShiftAssignedEvent,
  ShiftUnassignedEvent,
} from '@bikecoop/common';
import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {InjectPinoLogger, PinoLogger} from 'nestjs-pino';
import {Connection, EntityManager} from 'typeorm';

import {CoopEventEntity} from '../events/coop-event.entity';
import {MemberEntity} from '../memberships';
import {
  AssignShiftCommand,
  AssignShiftCommandResponse,
  UnassignShiftCommand,
  UnassignShiftCommandResponse,
} from './Commands';
import {ShiftAssignmentEntity} from './shift-assignment.entity';
import {ShiftEntity} from './shift.entity';

@Injectable()
export class ShiftsService {
  static readonly SHIFT_ASSIGNED_EVENT_NS = 'dbdd3ca6-c759-4c59-9215-e41763e47129';
  static readonly SHIFT_UNASSIGNED_EVENT_NS = '75ccd86c-5e0a-473d-9e19-d6527066d4ec';
  static readonly SHIFT_ASSIGNMENT_NS = 'be577851-b6b5-4d02-8df7-553ef679e9c9';

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectPinoLogger(ShiftsService.name) private readonly logger: PinoLogger,
  ) {}

  async assignShiftToMember(cmd: AssignShiftCommand): Promise<AssignShiftCommandResponse> {
    return await this.connection.transaction<AssignShiftCommandResponse>(
      'SERIALIZABLE',
      async (tx: EntityManager): Promise<AssignShiftCommandResponse> => {
        const [[shift], [member]] = await allSettledAndThrow([
          tx.findByIds(ShiftEntity, [cmd.shiftId]),
          tx.findByIds(MemberEntity, [cmd.memberId]),
        ]);

        if (!shift) throw new Error(`no shift with id: ${cmd.shiftId}`);
        if (!member) throw new Error(`no member with id: ${cmd.memberId}`);

        const shiftAssignmentId = chainUuidV5(ShiftsService.SHIFT_ASSIGNMENT_NS, shift.id, member.id);

        // if there's already a shift assignment for the shift/member, return event from db
        const shiftAssignment = await tx.findOne(ShiftAssignmentEntity, shiftAssignmentId);
        if (shiftAssignment) {
          this.logger.debug({cmd, shiftAssignment}, 'Handling duplicate shift assignment command');

          const event = await tx.findOne<ShiftAssignedEvent>(CoopEventEntity, shiftAssignment.createdBy);

          // the createdBy <-> event reference is enforced by db fk
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return {event: event!};
        }

        // else, create a new event which will trigger the creation of a shift-assignment
        const event: EventDataFrom<ShiftAssignedEvent> = {
          id: chainUuidV5(ShiftsService.SHIFT_ASSIGNED_EVENT_NS, shiftAssignmentId, cmd.requestId),
          happenedAt: new Date(),
          scopeType: CoopEventScopeTypes.SHIFT,
          scopeId: shift.id,
          type: CoopEventTypes.SHIFT_ASSIGNED,
          data: {
            shiftId: shift.id,
            memberId: member.id,
            actor: cmd.actor,
            shiftAssignmentId,
          },
        };

        const res = await tx.insert<ShiftAssignedEvent>(CoopEventEntity, event);
        // the "generatedMaps" insert response gives us the persistance data (sequenceId, insertedAt)
        // grab the first object from the "generatedMaps" return object
        const persistanceData = res.generatedMaps[0] as InsertedBaseEventData;

        return {
          event: Object.assign(event, persistanceData),
        };
      },
    );
  }

  async unassignShiftToMember(cmd: UnassignShiftCommand): Promise<UnassignShiftCommandResponse> {
    return await this.connection.transaction<UnassignShiftCommandResponse>(
      'SERIALIZABLE',
      async (tx: EntityManager): Promise<UnassignShiftCommandResponse> => {
        const eventId = chainUuidV5(
          ShiftsService.SHIFT_UNASSIGNED_EVENT_NS,
          cmd.shiftAssignmentId,
          cmd.requestId,
        );

        const previousEvent = await tx.findOne<ShiftUnassignedEvent>(CoopEventEntity, eventId);

        if (previousEvent) {
          this.logger.debug(
            {cmd, event: previousEvent},
            'Handling duplicate command from unassign shift request',
          );
          return {event: previousEvent};
        }

        const shiftAssignment = await tx.findOne(ShiftAssignmentEntity, cmd.shiftAssignmentId);

        if (!shiftAssignment) {
          // if there's no shift assignment to cancel, then that's a no go
          throw new Error(`No shift assignment with id: ${cmd.shiftAssignmentId}`);
        }

        const event: EventDataFrom<ShiftUnassignedEvent> = {
          id: eventId,
          happenedAt: new Date(),
          scopeType: CoopEventScopeTypes.SHIFT,
          scopeId: shiftAssignment.shiftId,
          type: CoopEventTypes.SHIFT_UNASSIGNED,
          data: {
            shiftAssignmentId: shiftAssignment.id,
            shiftId: shiftAssignment.shiftId,
            memberId: shiftAssignment.memberId,
            actor: cmd.actor,
            reason: cmd.reason,
          },
        };

        const res = await tx.insert<ShiftUnassignedEvent>(CoopEventEntity, event);
        // the "generatedMaps" insert response gives us the persistance data (sequenceId, insertedAt)
        // grab the first object from the "generatedMaps" return object
        const persistanceData = res.generatedMaps[0] as InsertedBaseEventData;

        return {
          event: Object.assign(event, persistanceData),
        };
      },
    );
  }
}
