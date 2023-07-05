import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('info/:token')
  getInfo(@Param('token') token: string): Promise<any> {
    return this.userService.getInfo(token);
  }
}
