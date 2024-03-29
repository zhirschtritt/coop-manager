import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @Get()
  ping() {
    return; // 200 OK
  }

  @Get('test-auth')
  @UseGuards(new AuthGuard())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTest(@Session() _session: SessionContainer): Promise<string> {
    return await 'Yay! You are authorized';
  }
}
