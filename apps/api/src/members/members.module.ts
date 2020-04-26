import {getRepository} from 'fireorm';
import {Module} from '@nestjs/common';
import {MembersController} from './members.controller';
import {MemberEntity} from './members.repository';
import {MEMBER_REPO} from './keys';

const providers = [
  {
    provide: MEMBER_REPO,
    // getRepository needs to be called at runtime to allow firestore to initialize first
    useFactory: () => getRepository(MemberEntity),
  },
];

@Module({
  controllers: [MembersController],
  providers,
  exports: providers,
})
export class MembersModule {}
