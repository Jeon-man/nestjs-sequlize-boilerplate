import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [SequelizeModule],
})
export class UserModule {}

export default UserModule;
