import {Module, Global} from '@nestjs/common';
import {Firebase} from './firebase';

@Global()
@Module({
  providers: [Firebase],
  exports: [],
})
export class AuthModule {}
