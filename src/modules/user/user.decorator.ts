import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

// TODO: user data key로 선택 가능하게 하기
export function getUser(data: unknown, ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest<Request>();
  const user = req.user;

  if (!user) return undefined;

  return user;
}

export const User = createParamDecorator(getUser);
