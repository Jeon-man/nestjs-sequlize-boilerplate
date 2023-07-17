import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ParamDecoratorReturnType } from '@util/nest';
import { Request } from 'express';
import { Attributes } from 'sequelize';
import { User as UserModel } from '../models';

export function getUser<Key extends keyof Attributes<UserModel> | undefined = undefined>(
  data: Key,
  ctx: ExecutionContext,
): ParamDecoratorReturnType<UserModel, Key> | undefined {
  const req = ctx.switchToHttp().getRequest<Request>();
  const user = req.user;

  if (!user) return undefined;

  return (data ? user[data] : user) as ParamDecoratorReturnType<UserModel, Key>;
}

export const User = createParamDecorator(getUser);
