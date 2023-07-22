import { ConfigService } from '@module/config';
import { Injectable, Logger } from '@nestjs/common';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';

@Injectable()
export class DBService implements SequelizeOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions | Promise<SequelizeModuleOptions> {
    const isProduction = this.config.get('NODE_ENV') === 'production';

    const [dialect, host, port, username, password, database] = this.config.getEnvVariable([
      'DB_DIALECT',
      'DB_HOST',
      'DB_PORT',
      'DB_USERNAME',
      'DB_PASSWORD',
      'DB_DATABASE',
    ]);

    return {
      dialect,
      host,
      port,
      username,
      password,
      database,

      models: [],

      logging: !isProduction
        ? (sql: string, time: any) => {
            Logger.debug(sql.replace('Executed', `Executed [${time}ms]`), 'DBService(default)');
          }
        : false,
      logQueryParameters: !isProduction,
      benchmark: !isProduction,
      timezone: '+09:00',
      dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
      },

      pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },

      autoLoadModels: true,
      // sync: { force: true },
    };
  }
}
