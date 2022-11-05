import {
  allSettledAndThrow,
  chainUuidV5,
  CoopEvent,
  CoopEventScopeTypes,
  CoopEventTypes,
  EventDataFrom,
  MembershipCreatedEvent,
  MembershipStartedEvent,
  MembershipStatuses,
} from '@bikecoop/common';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { endOfDay } from 'date-fns';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandler } from '../events/CommandHandler';
import { EventsService } from '../events/events.service';
import { CreateMembershipCommand } from './commands/CreateMembershipCommand';

@Injectable()
export class MembershipsService {
  static readonly MEMBERSHIP_ENTITY_NS = '2932c142-c442-4de1-a7b7-fbeb12e972b6';
  static readonly MEMBERSHIP_EVENT_NS = '32c3f352-751b-4373-82f4-88513d58f81c';

  constructor(
    @InjectPinoLogger(MembershipsService.name) private readonly logger: PinoLogger,
    private readonly commandHandler: CommandHandler,
    private readonly eventDatastore: EventsService,
  ) {}

  // every day at 9:00AM
  @Cron('0 0 9 1/1 * ? *')
  async startDelayedMemberships() {
    this.logger.debug('Checking for memberships starting today');
    const now = new Date();

    await this.commandHandler.handleInTransaction(async (tx) => {
      const toStart = await tx.membership.findMany({
        where: {
          status: MembershipStatuses.INACTIVE,
          startDate: { lte: endOfDay(now) },
        },
      });

      this.logger.debug(
        { toStart: toStart.map((t) => t.id) },
        `Found ${toStart.length} memberships to start`,
      );

      const events: EventDataFrom<MembershipStartedEvent>[] = toStart.map((membership) => {
        return {
          id: chainUuidV5(MembershipsService.MEMBERSHIP_ENTITY_NS, membership.id, 'membership-started'),
          happenedAt: now,
          scopeId: membership.id,
          scopeType: CoopEventScopeTypes.MEMBERSHIP,
          type: CoopEventTypes.MEMBERSHIP_STARTED,
          data: {},
        };
      });

      const createdEvents: MembershipStartedEvent[] = await allSettledAndThrow<MembershipStartedEvent>(
        events.map(async (e) => await this.eventDatastore.create(e)) as any,
      );

      return { events: createdEvents };
    });
  }

  async createMembership(cmd: CreateMembershipCommand) {
    return await this.commandHandler.handleInTransaction(async (tx) => {
      await allSettledAndThrow([
        tx.member.findUnique({ where: { id: cmd.memberId }, rejectOnNotFound: true }),
        tx.membershipType.findUnique({ where: { id: cmd.membershipTypeId }, rejectOnNotFound: true }),
      ]);

      /**
       * TODO: validate command
       * * check if same membership overlaps dates
       * * check membership start/end make sense
       */

      const membershipId = chainUuidV5(
        MembershipsService.MEMBERSHIP_ENTITY_NS,
        cmd.memberId,
        cmd.membershipTypeId,
        cmd.requestId,
      );

      const createMembershipEventId = this.membershipCreatedEventId(membershipId);

      const dupeMembership = await tx.membership.findUnique({ where: { id: membershipId } });

      if (dupeMembership) {
        const events: (MembershipCreatedEvent | MembershipStartedEvent)[] = (await tx.coopEvent.findMany({
          where: { id: { in: [createMembershipEventId, this.membershipStartedEventId(membershipId)] } },
        })) as any;

        return { events };
      }

      const now = new Date();

      const event: EventDataFrom<MembershipCreatedEvent> = {
        id: createMembershipEventId,
        happenedAt: now,
        scopeId: membershipId,
        scopeType: CoopEventScopeTypes.MEMBERSHIP,
        type: CoopEventTypes.MEMBERSHIP_CREATED,
        data: {
          memberId: cmd.memberId,
          membershipTypeId: cmd.membershipTypeId,
          membershipId: membershipId,
          actor: cmd.actor,
          startDate: cmd.startDate.toISOString(),
          endDate: cmd.endDate.toISOString(),
        },
      };

      const allEvents: CoopEvent[] = [await this.eventDatastore.create(event, tx)];

      if (cmd.startDate < endOfDay(now)) {
        const startedEvent: EventDataFrom<MembershipStartedEvent> = {
          id: this.membershipStartedEventId(membershipId),
          happenedAt: now,
          scopeId: membershipId,
          scopeType: CoopEventScopeTypes.MEMBERSHIP,
          type: CoopEventTypes.MEMBERSHIP_STARTED,
          data: {},
        };

        allEvents.push(await this.eventDatastore.create(startedEvent));
      }

      return { events: allEvents };
    });
  }

  private membershipCreatedEventId(membershipId: string) {
    return chainUuidV5(MembershipsService.MEMBERSHIP_EVENT_NS, membershipId);
  }

  private membershipStartedEventId(membershipId: string): string {
    return chainUuidV5(MembershipsService.MEMBERSHIP_EVENT_NS, membershipId, 'membership-started');
  }
}
