import { ConfigModule as OriginalConfigModule } from '@nestjs/config';

export const ConfigDynamicModule = OriginalConfigModule.forRoot({
  envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
  isGlobal: true,
});

export default ConfigDynamicModule;
