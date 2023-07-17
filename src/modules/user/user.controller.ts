import { Auth } from '@module/auth/decorator';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './decorator';
import { User as UserModel } from './models';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @InjectModel(UserModel)
    private readonly userCRUD: typeof UserModel,
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

  @ApiOperation({
    summary: '자기 자신 정보',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Auth()
  @Get('me')
  async getMe(@User('id') user: number) {
    return user;
  }
}
