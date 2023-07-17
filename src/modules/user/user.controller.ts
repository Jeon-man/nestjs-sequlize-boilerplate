import { Auth } from '@module/auth/decorator';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @InjectModel(User)
    private readonly userCRUD: typeof User,
  ) {}

  @ApiOperation({
    summary: 'user list',
    description: 'user list를 불러옵니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Auth()
  @Get()
  async getUserList() {
    return this.userCRUD.findAndCountAll();
  }
}
