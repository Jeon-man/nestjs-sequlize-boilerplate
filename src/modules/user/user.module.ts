import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { isModelClass } from '@util/sequelize';
import * as M from './models';
const models = Object.values(M).filter(isModelClass);

@Module({
  imports: [SequelizeModule.forFeature(models)],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserRouteModule {}

export default UserRouteModule;
