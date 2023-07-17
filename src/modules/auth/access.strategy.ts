import { User } from '@module/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    @InjectModel(User)
    private readonly userCRUD: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userCRUD.findOne({
      where: {
        id: payload.id,
      },
      rejectOnEmpty: new NotFoundException(`User(${payload.id}) not found.`),
    });

    return user;
  }
}
