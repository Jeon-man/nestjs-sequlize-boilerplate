import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userCRUD: typeof User,
  ) {}
}
