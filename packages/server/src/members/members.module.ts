import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MemberEntity} from './member.entity';
import {MembersController} from './members.controller';

@Module({
  controllers: [MembersController],
  imports: [TypeOrmModule.forFeature([MemberEntity])],
})
export class MembersModule {}
