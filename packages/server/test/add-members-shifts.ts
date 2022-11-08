import { CoopEventScopeTypes, CoopEventTypes } from '@bikecoop/common';
import { PrismaClient } from '@prisma/client';
import Chance from 'chance';
import _ from 'lodash';
import { addDays, addHours } from 'date-fns';

const chance = new Chance();

export async function addMembersAndShifts(prisma: PrismaClient) {
  const memberIds = _.range(10).map(() => chance.guid());

  await prisma.member.createMany({
    skipDuplicates: true,
    data: memberIds.map((id) => {
      const [firstName, lastName] = chance.name({ full: true }).split(' ');
      return {
        id,
        firstName,
        lastName,
        email: chance.email(),
      };
    }),
  });

  const shiftIds = _.range(10).map(() => chance.guid());

  await prisma.shift.createMany({
    skipDuplicates: true,
    data: shiftIds.map((id, i) => {
      const startsAt = addDays(new Date(), i * 3);
      return {
        id,
        startsAt: startsAt,
        endsAt: addHours(startsAt, 3),
      };
    }),
  });

  let shifts = await prisma.shift.findMany({
    where: { id: { in: shiftIds } },
    include: { slots: { select: { id: true } } },
  });

  await prisma.shiftSlot.createMany({
    data: shifts.map((s) => ({
      name: 'primary',
      shiftId: s.id,
      data: { maxInstances: 1 },
    })),
  });

  const members = await prisma.member.findMany({ where: { id: { in: memberIds } } });
  shifts = await prisma.shift.findMany({
    where: { id: { in: shiftIds } },
    include: { slots: { select: { id: true } } },
  });

  await prisma.coopEvent.create({
    data: {
      type: CoopEventTypes.SHIFT_ASSIGNED,
      scopeType: CoopEventScopeTypes.SHIFT,
      scopeId: chance.guid(),
      happenedAt: new Date(),
      data: {},
      shiftAssignment: {
        createMany: {
          data: members.map((m, idx) => ({
            memberId: m.id,
            shiftId: shifts[idx].id,
            shiftSlotId: shifts[idx].slots[0].id,
          })),
        },
      },
    },
  });
}
