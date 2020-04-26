import {Controller, Get, Query} from '@nestjs/common';

@Controller('members')
export class MembersController {

  @Get('auth')
  newMember(@Query() query: any): {isAuthorized: boolean} {
    console.log(query);
    return {isAuthorized: true};
  }
}
