import {Module} from '@nestjs/common';
import {EventsModule} from '../events/events.module';
import {PrismaModule} from '../prisma';
import {MembershipResolver} from './memberships.resolver';
import {MembershipsService} from './memberships.service';

@Module({
  imports: [EventsModule, PrismaModule],
  providers: [MembershipsService, MembershipResolver],
})
export class MembershipsModule {}
