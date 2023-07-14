import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenService } from './token.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@module/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectModel(User)
    private readonly userCRUD: typeof User,
  ) {}

  async login(name: string) {
    const user = await this.userCRUD.findOne({
      where: {
        name,
      },
      rejectOnEmpty: new NotFoundException('Not found user'),
    });

    return this.tokenService.generateToken(user.id);
  }
}
