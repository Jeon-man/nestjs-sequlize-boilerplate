import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';

import { isModelClass } from '@util/sequelize';
import * as M from './models';
import { UserController } from './user.controller';
const models = Object.values(M).filter(isModelClass);

@Module({
  imports: [SequelizeModule.forFeature(models)],
  providers: [UserService],
  controllers: [UserController],
  exports: [SequelizeModule],
})
export default class UserModule {}
