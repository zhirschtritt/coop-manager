import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {auth as firebaseAuth} from 'firebase-admin';
import {UserDto} from '@bike-coop/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request?.body?.user);
  }

  async validateRequest(user: UserDto) {
    try {
      await firebaseAuth().verifyIdToken(user.token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
