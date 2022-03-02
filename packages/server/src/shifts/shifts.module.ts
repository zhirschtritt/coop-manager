import {Module} from '@nestjs/common';
import {ShiftsService} from './shifts.service';
import {ShiftsResolver} from './shifts.resolver';
import {PrismaModule} from '../prisma';
import {EventsModule} from '../events/events.module';
import {ShiftAssignmentsResolver} from './shift-assignments.resolver';

@Module({
  providers: [ShiftsService, ShiftsResolver, ShiftAssignmentsResolver],
  imports: [PrismaModule, EventsModule],
})
export class ShiftsModule {}
