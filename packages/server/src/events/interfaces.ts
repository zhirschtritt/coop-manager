import {PrismaClient} from '@prisma/client';

export type Transaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];
