import {CoopEventTypes, MembershipCreatedEvent, MembershipStatuses} from '@bikecoop/common';
import {EventHandler} from './EventHandler';
import {Transaction} from '../../interfaces';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MembershipCreatedHandler extends EventHandler<MembershipCreatedEvent> {
  constructor() {
    super(new Set([CoopEventTypes.MEMBERSHIP_CREATED]));
  }

  async handle(event: MembershipCreatedEvent, transaction: Transaction): Promise<void> {
    const {startDate, endDate, memberId, membershipId, membershipTypeId} = event.data;

    await transaction.membership.create({
      data: {
        id: membershipId,
        membershipTypeId,
        memberId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        // will be set to ACTIVE when membership-started event is emitted
        status: MembershipStatuses.INACTIVE,
      },
    });
  }
}
