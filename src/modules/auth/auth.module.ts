import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { AccessStrategy } from './access.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '@module/user';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [TokenService, AuthService, AccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

export default AuthModule;
