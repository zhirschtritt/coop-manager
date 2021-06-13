import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CoopEventEntity} from '../events/coop-event.entity';
import {ShiftsService} from './shifts.service';
import {ShiftsResolver} from './shifts.resolver';
import {ShiftEntity} from '.';

@Module({
  providers: [ShiftsService, ShiftsResolver],
  imports: [TypeOrmModule.forFeature([CoopEventEntity, ShiftEntity])],
})
export class ShiftsModule {}
