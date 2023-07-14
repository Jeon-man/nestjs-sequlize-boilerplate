import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

export const Auth = () => applyDecorators(UseGuards(JwtAuthGuard));
