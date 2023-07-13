import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
