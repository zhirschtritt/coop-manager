import {
  allSettledAndThrow,
  AssignShiftCommand,
  chainUuidV5,
  CoopEvent,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  ShiftAssignedEvent,
  ShiftSlot,
  ShiftUnassignedEvent,
} from '@bikecoop/common';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandler } from '../events/CommandHandler';
import { AssignShiftCommandResponse, UnassignShiftCommand, UnassignShiftCommandResponse } from './Commands';

@Injectable()
export class ShiftsService {
  static readonly SHIFT_ASSIGNED_EVENT_NS = 'dbdd3ca6-c759-4c59-9215-e41763e47129';
  static readonly SHIFT_UNASSIGNED_EVENT_NS = '75ccd86c-5e0a-473d-9e19-d6527066d4ec';
  static readonly SHIFT_ASSIGNMENT_NS = 'be577851-b6b5-4d02-8df7-553ef679e9c9';

  constructor(
    @InjectPinoLogger(ShiftsService.name) private readonly logger: PinoLogger,
    private readonly commandHandler: CommandHandler,
  ) {}

  async assignShiftToMember(cmd: AssignShiftCommand): Promise<AssignShiftCommandResponse> {
    return await this.commandHandler.handleInTransaction(async (tx) => {
      const [shift, member] = await allSettledAndThrow([
        tx.shift.findUniqueOrThrow({
          where: { id: cmd.shiftId },
          include: {
            shiftAssignments: true,
            slots: { where: cmd.slot.id ? { id: cmd.slot.id } : { name: cmd.slot.name } },
          },
        }),
        tx.member.findUniqueOrThrow({ where: { id: cmd.memberId } }),
      ]);

      const shiftSlot = shift.slots[0] as ShiftSlot | undefined;
      if (!shiftSlot) {
        // TODO: FUTURE: we could create a non-existent slot here by default
        // or if specified in the command structure somehow
        throw new NotFoundException(cmd, 'No matching slot found for shift');
      }

      const shiftAssignmentId = this.makeAssignmentId({
        shiftId: shift.id,
        memberId: member.id,
        slotId: shiftSlot.id,
      });

      const dupeShiftAssignment = shift.shiftAssignments.find((s) => s.id === shiftAssignmentId);

      // handle duplicate command
      if (dupeShiftAssignment) {
        this.logger.debug(
          { cmd, shiftAssignment: dupeShiftAssignment },
          'Handling duplicate shift assignment command',
        );

        const event = await tx.coopEvent.findUniqueOrThrow({
          where: { id: dupeShiftAssignment.createdBy },
        });

        return { events: [event as any as CoopEvent] };
      }

      // else, handle new command
      if (shift.shiftAssignments.length) {
        if (shiftSlot.data.maxInstances && shift.shiftAssignments.length + 1 > shiftSlot.data.maxInstances) {
          throw new ConflictException(
            { cmd, shift },
            'Slot would exceed max instance limit, cannot assign shift',
          );
        }
      }

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
          slotId: shiftSlot.id,
        },
      };

      const event = await tx.coopEvent.create({ data: eventArgs });

      return { events: [event as any as CoopEvent] };
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
        where: { id: eventId },
      })) as ShiftUnassignedEvent | null;

      if (dupeEvent) {
        this.logger.debug(
          { cmd, event: dupeEvent },
          'Handling duplicate command from unassign shift request',
        );
        return { events: [dupeEvent] };
      }

      const shiftAssignment = await tx.shiftAssignment.findUniqueOrThrow({
        where: { id: cmd.shiftAssignmentId },
        include: { shiftSlot: true },
      });

      const eventInfo: EventDataFrom<ShiftUnassignedEvent> = {
        id: eventId,
        happenedAt: new Date(),
        scopeType: CoopEventScopeTypes.SHIFT,
        scopeId: shiftAssignment.shiftId,
        type: CoopEventTypes.SHIFT_UNASSIGNED,
        data: {
          shiftAssignmentId: shiftAssignment.id,
          shiftId: shiftAssignment.shiftId,
          slot: shiftAssignment.shiftSlot.id,
          memberId: shiftAssignment.memberId,
          actor: cmd.actor,
          reason: cmd.reason,
        },
      };

      const event: ShiftUnassignedEvent = (await tx.coopEvent.create({ data: eventInfo })) as any;

      return {
        events: [event],
      };
    });
  }

  private makeAssignmentId(ctx: { shiftId: string; memberId: string; slotId: string }): string {
    return chainUuidV5(ShiftsService.SHIFT_ASSIGNMENT_NS, ctx.shiftId, ctx.memberId, ctx.slotId);
  }
}
