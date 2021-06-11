import {Module} from '@nestjs/common';
import { ShiftsService } from './shifts.service';

@Module({
  providers: [ShiftsService]
})
export class ShiftsModule {}
