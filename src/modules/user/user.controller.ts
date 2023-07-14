import { Controller, Get, HttpStatus, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAndCountResponseType } from '@util/swagger';

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
  @Get()
  async getUserList() {
    return this.userCRUD.findAndCountAll();
  }
}
