import { CoopEventScopeTypes, CoopEventTypes } from '@bikecoop/common';
import { PrismaClient } from '@prisma/client';
import Chance from 'chance';
import { addDays, addHours } from 'date-fns';
import _ from 'lodash';

const prisma = new PrismaClient();
const chance = new Chance();

async function main() {
  const memberIds = _.range(10).map(() => chance.guid());

  await prisma.member.createMany({
    skipDuplicates: true,
    data: memberIds.map((id) => {
      const [firstName, lastName] = chance.name({ full: true }).split(' ');
      return {
        id,
        firstName,
        lastName,
        image: `https://avatars.dicebear.com/api/open-peeps/${chance.guid()}.svg`,
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
    data: shifts.flatMap((s) => [
      {
        name: 'primary',
        shiftId: s.id,
        data: { minInstances: 1, maxInstances: 1 },
      },
      {
        name: 'secondary',
        shiftId: s.id,
        data: { minInstances: 0, maxInstances: 1 },
      },
      ...(chance.bool()
        ? [
            {
              name: 'backup',
              shiftId: s.id,
              data: {},
            },
            {
              name: 'volunteer',
              shiftId: s.id,
              data: { maxInstances: 3 },
            },
            {
              name: 'hangout buddy',
              shiftId: s.id,
              data: { maxInstances: 3 },
            },
          ]
        : []),
    ]),
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
          data: members.map((m) => {
            const s = chance.pickone(shifts);
            return { memberId: m.id, shiftId: s.id, shiftSlotId: chance.pickone(s.slots).id };
          }),
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
