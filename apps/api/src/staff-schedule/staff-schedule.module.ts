import {Module} from '@nestjs/common';
import {StaffScheduleService} from './staff-schedule.service';

@Module({
  providers: [StaffScheduleService],
})
export class StaffScheduleModule {}
