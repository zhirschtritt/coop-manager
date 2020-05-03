import {Controller, UseGuards, Inject, Post, UnauthorizedException, Query, HttpStatus} from '@nestjs/common';
import {PinoLogger} from 'nestjs-pino';
import {BaseFirestoreRepository} from 'fireorm';
import {MemberTypes} from '@bike-coop/common';
import {ConfigService} from '@nestjs/config';
import {auth as firebaseAuth} from 'firebase-admin';

import {MEMBER_REPO} from '../members/keys';
import {MemberEntity} from '../members/members.repository';
import {RolesGuard} from './Roles.guard';
import {Roles} from './roles.decorator';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
    @Inject(MEMBER_REPO) private readonly memberRepo: BaseFirestoreRepository<MemberEntity>,
    ) {
      logger.setContext(this.constructor.name);
    }

  @Post('login')
  @Roles('staff')
  async login(@Query('token') token: string): Promise<void> {
    // FIXME: we've already done this check in the guard, but we do it again here
    // might not be an issue since login should happen relatively infrequently
    const claims = await firebaseAuth().verifyIdToken(token);
    if (claims.staff) {
      return;
    }

    const staffEmails = this.configService.get<string[]>('members.staffEmails');
    const user = await firebaseAuth().getUser(claims.uid);

    if (staffEmails.includes(user.email)) {
      await this.findOrCreateMember(user);

      // wait for member creation before assigning user claim
      await this.setCustomClaim(user);

      return;
    } else {
      throw new UnauthorizedException(
        'User is not registered to this app, contact admin if you believe this is a mistake',
      );
    }
  }

  private async setCustomClaim(user: firebaseAuth.UserRecord) {
    await firebaseAuth().setCustomUserClaims(user.uid, {staff: true});
  }

  private async findOrCreateMember(user: firebaseAuth.UserRecord): Promise<MemberEntity> {
    let member;

    await this.memberRepo.runTransaction(async (transaction) => {
      member = await transaction.findById(user.uid);

      if (!member) {
        member = await transaction.create({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          type: MemberTypes.STAFF,
        });
      }
    });

    return member;
  }
}
