import {Module} from '@nestjs/common';
import {PrismaModule} from '../prisma';

import {MemberResolver} from './member.resolver';
import {MembersController} from './members.controller';

@Module({
  providers: [MemberResolver],
  controllers: [MembersController],
  imports: [PrismaModule],
})
export class MembersModule {}
