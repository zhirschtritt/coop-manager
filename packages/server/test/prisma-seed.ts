import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import Chance from 'chance';

const chance = new Chance();

async function main() {
  const term = await prisma.shiftTerm.upsert({
    where: {id: '0c73c618-84a5-4d91-8eaf-acfec9476033'},
    update: {},
    create: {
      id: '0c73c618-84a5-4d91-8eaf-acfec9476033',
      startDate: new Date(),
      endDate: new Date(),
      name: 'test',
      shifts: {
        create: {
          startsAt: new Date(),
          endsAt: new Date(),
          slots: {
            'primary-staff': {minInstances: 1, maxInstances: 1},
          },
        },
      },
    },
    include: {shifts: {select: {id: true}}},
  });

  const member = await prisma.member.upsert({
    where: {id: '83892c42-588f-45c2-9d43-f9874a98c5f2'},
    update: {},
    create: {
      id: '83892c42-588f-45c2-9d43-f9874a98c5f2',
      email: chance.email(),
      firstName: chance.first(),
      lastName: chance.last(),
      meta: {
        likes: ['foo'],
      },
    },
  });

  const event = await prisma.coopEvent.upsert({
    where: {id: 'c0906f35-3335-4db5-a553-88a0b3a6ffa0'},
    update: {},
    create: {
      id: 'c0906f35-3335-4db5-a553-88a0b3a6ffa0',
      happenedAt: chance.date(),
      scopeId: chance.guid(),
      scopeType: 'shift',
      type: 'shift-assigned',
      data: {
        [chance.string()]: chance.string(),
        [chance.string()]: chance.integer(),
      },
    },
  });

  const assignment = await prisma.shiftAssignment.upsert({
    where: {id: 'ce044592-e5c8-4cc8-a939-0c6cf02bc212'},
    update: {},
    create: {
      id: 'ce044592-e5c8-4cc8-a939-0c6cf02bc212',
      slot: 'primary-staff',
      createdBy: event.id,
      memberId: member.id,
      shiftId: term.shifts[0].id,
    },
  });

  console.log(term, member, event, assignment);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
