import {Module} from '@nestjs/common';
import {ShiftsService} from './shifts.service';
import {ShiftsResolver} from './shifts.resolver';
import {PrismaModule} from '../prisma';
import {EventsModule} from '../events/events.module';

@Module({
  providers: [ShiftsService, ShiftsResolver],
  imports: [PrismaModule, EventsModule],
})
export class ShiftsModule {}
