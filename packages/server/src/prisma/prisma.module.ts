import {Module} from '@nestjs/common';
import {PrismaService} from './prisma.service';

const prismaServiceProvider = {
  useClass: PrismaService,
  provide: Symbol('prisma-service'),
};
export const PRISMA_SERVICE = prismaServiceProvider.provide;

@Module({
  providers: [prismaServiceProvider],
  exports: [prismaServiceProvider],
})
export class PrismaModule {}
