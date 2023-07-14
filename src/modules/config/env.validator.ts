import { createValidator } from '@util/validator';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum Dialect {
  MySQL = 'mysql',
  PostgreSQL = 'postgres',
  SQLite = 'sqlite',
  MariaDB = 'mariadb',
  MSSQL = 'mssql',
  DB2 = 'db2',
  Snowflake = 'snowflake',
  Oracle = 'oracle',
}

export class EnvironmentVariables {
  // Common

  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  APP_NAME: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  PORT: number = 3000 as const;

  @IsOptional()
  @IsIn(['error', 'warn', 'info', 'verbose', 'debug'])
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'verbose' | 'debug' = 'debug';

  @IsOptional()
  @IsEnum(Dialect)
  DB_DIALECT: Dialect = Dialect.MySQL;

  @IsString()
  DB_HOST: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  DB_PORT: number = 3306 as const;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;

  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;
}

export const validateConfig = createValidator(EnvironmentVariables, {
  transformToInstanceOptions: { exposeDefaultValues: true },
  sync: true,
});
