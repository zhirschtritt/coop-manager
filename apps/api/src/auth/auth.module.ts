import {Module, Global} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {MembersModule} from '../members/members.module';
import {ConfigModule} from '@nestjs/config';

@Global()
@Module({
  imports: [MembersModule, ConfigModule],
  controllers: [AuthController],
})
export class AuthModule {}
