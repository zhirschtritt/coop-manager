import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CoopEventEntity} from '../events/coop-event.entity';
import {ShiftsService} from './shifts.service';
import {ShiftsResolver} from './shifts.resolver';

@Module({
  providers: [ShiftsService, ShiftsResolver],
  imports: [TypeOrmModule.forFeature([CoopEventEntity])],
})
export class ShiftsModule {}
