import { User } from '@module/user';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBody, RegisterBody } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User)
    private readonly userCRUD: typeof User,
  ) {}

  @ApiOperation({
    summary: '(임시) 유저 생성',
  })
  @Post('register')
  async register(@Body() createData: RegisterBody) {
    return this.userCRUD.create(createData);
  }

  @ApiOperation({
    summary: '(임시) 유저 로그인',
  })
  @Post('login')
  async login(@Body() loginData: LoginBody) {
    return this.authService.login(loginData.name);
  }
}
