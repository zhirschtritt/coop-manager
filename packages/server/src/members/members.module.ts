import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MemberEntity} from './member.entity';
import {MemberResolver} from './member.resolver';
import {MembersController} from './members.controller';

@Module({
  providers: [MemberResolver],
  controllers: [MembersController],
  imports: [TypeOrmModule.forFeature([MemberEntity])],
})
export class MembersModule {}
