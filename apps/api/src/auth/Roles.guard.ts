import {PinoLogger} from 'nestjs-pino';
import {auth as firebaseAuth} from 'firebase-admin';
import {Reflector} from '@nestjs/core';
import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: PinoLogger,
    ) {
      logger.setContext(this.constructor.name);
    }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.query.token;

    const claims = await firebaseAuth().verifyIdToken(token);

    if (roles.every((role) => !!claims[role])) {
      return true;
    } else {
      this.logger.error({claims, roles}, 'User not authorized');
      throw new UnauthorizedException();
    }
  }
}
