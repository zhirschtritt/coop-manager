import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-auth')
  @UseGuards(new AuthGuard())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTest(@Session() _session: SessionContainer): Promise<string> {
    return await 'Yay! You are authorized';
  }
}
