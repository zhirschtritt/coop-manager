import { CoopEventTypes, MembershipStatuses, MembershipStartedEvent } from '@bikecoop/common';
import { EventHandler } from './EventHandler';
import { Transaction } from '../../interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipStartedHandler extends EventHandler<MembershipStartedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.MEMBERSHIP_STARTED]));
  }

  async handle(event: MembershipStartedEvent, transaction: Transaction): Promise<void> {
    await transaction.membership.update({
      where: {
        id: event.scopeId,
      },
      data: {
        status: MembershipStatuses.ACTIVE,
      },
    });
  }
}
