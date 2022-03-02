import {
  allSettledAndThrow,
  AssignShiftCommand,
  chainUuidV5,
  CoopEvent,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  ShiftAssignedEvent,
  ShiftUnassignedEvent,
} from '@bikecoop/common';
import {HttpException, Injectable} from '@nestjs/common';
import {InjectPinoLogger, PinoLogger} from 'nestjs-pino';

import {CommandHandler} from '../events/CommandHandler';
import {AssignShiftCommandResponse, UnassignShiftCommand, UnassignShiftCommandResponse} from './Commands';
import {ShiftEntity} from './shift.entity';

@Injectable()
export class ShiftsService {
  static readonly SHIFT_ASSIGNED_EVENT_NS = 'dbdd3ca6-c759-4c59-9215-e41763e47129';
  static readonly SHIFT_UNASSIGNED_EVENT_NS = '75ccd86c-5e0a-473d-9e19-d6527066d4ec';
  static readonly SHIFT_ASSIGNMENT_NS = 'be577851-b6b5-4d02-8df7-553ef679e9c9';

  constructor(
    @InjectPinoLogger(ShiftsService.name) private readonly logger: PinoLogger,
    private readonly commandHandler: CommandHandler,
  ) {}

  private makeAssignmentId(ctx: {shiftId: string; memberId: string; slotName: string}): string {
    return chainUuidV5(ShiftsService.SHIFT_ASSIGNMENT_NS, ctx.shiftId, ctx.memberId, ctx.slotName);
  }

  async assignShiftToMember(cmd: AssignShiftCommand): Promise<AssignShiftCommandResponse> {
    return await this.commandHandler.handleInTransaction(async (tx) => {
      const [{shiftAssignments, ...shift}, member] = await allSettledAndThrow([
        tx.shift.findUnique({
          where: {id: cmd.shiftId},
          include: {shiftAssignments: {where: {slot: cmd.slot}}},
          rejectOnNotFound: true,
        }),
        tx.member.findUnique({where: {id: cmd.memberId}, rejectOnNotFound: true}),
      ]);

      if (!(shift as ShiftEntity).slots[cmd.slot]) {
        throw new HttpException(`No matching slot "${cmd.slot}" on shift`, 422);
      }

      const shiftAssignmentId = this.makeAssignmentId({
        shiftId: shift.id,
        memberId: member.id,
        slotName: cmd.slot,
      });

      const dupeShiftAssignment = shiftAssignments.find((s) => s.id === shiftAssignmentId);

      // handle duplicate command
      if (dupeShiftAssignment) {
        this.logger.debug(
          {cmd, shiftAssignment: dupeShiftAssignment},
          'Handling duplicate shift assignment command',
        );

        const event = await tx.coopEvent.findUnique({
          where: {id: dupeShiftAssignment.createdBy},
          rejectOnNotFound: true,
        });

        return {events: [(event as any) as CoopEvent]};
      }

      // handle new command
      if (shiftAssignments.length) {
        const slotDef = (shift as ShiftEntity).slots[cmd.slot];
        if (slotDef?.maxInstances && shiftAssignments.length + 1 > slotDef.maxInstances) {
          throw new HttpException('Cannot assign shift, slot already at max instances', 422);
        }
      }

      // else, create a new event which will trigger the creation of a shift-assignment
      const eventArgs: EventDataFrom<ShiftAssignedEvent> = {
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
          slot: cmd.slot,
        },
      };

      const event = await tx.coopEvent.create({data: eventArgs});

      return {events: [(event as any) as CoopEvent]};
    });
  }

  async unassignShiftToMember(cmd: UnassignShiftCommand): Promise<UnassignShiftCommandResponse> {
    return await this.commandHandler.handleInTransaction(async (tx) => {
      const eventId = chainUuidV5(
        ShiftsService.SHIFT_UNASSIGNED_EVENT_NS,
        cmd.shiftAssignmentId,
        cmd.requestId,
      );

      const dupeEvent = (await tx.coopEvent.findUnique({
        where: {id: eventId},
      })) as ShiftUnassignedEvent | null;

      if (dupeEvent) {
        this.logger.debug({cmd, event: dupeEvent}, 'Handling duplicate command from unassign shift request');
        return {events: [dupeEvent]};
      }

      const shiftAssignment = await tx.shiftAssignment.findUnique({
        where: {id: cmd.shiftAssignmentId},
      });

      if (!shiftAssignment) {
        throw new HttpException(`No shift assignment with id: ${cmd.shiftAssignmentId}`, 422);
      }

      const eventInfo: EventDataFrom<ShiftUnassignedEvent> = {
        id: eventId,
        happenedAt: new Date(),
        scopeType: CoopEventScopeTypes.SHIFT,
        scopeId: shiftAssignment.shiftId,
        type: CoopEventTypes.SHIFT_UNASSIGNED,
        data: {
          shiftAssignmentId: shiftAssignment.id,
          shiftId: shiftAssignment.shiftId,
          slot: shiftAssignment.slot,
          memberId: shiftAssignment.memberId,
          actor: cmd.actor,
          reason: cmd.reason,
        },
      };

      const event: ShiftUnassignedEvent = (await tx.coopEvent.create({data: eventInfo})) as any;

      return {
        events: [event],
      };
    });
  }
}
