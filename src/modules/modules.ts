// @index(['./*', '!./index.ts', '!./common', '!./*.(spec|test).ts', '!./app.module.ts'], f => `export { default as ${f.name}Module } from '${f.path}';`)
export { default as appModule } from './app';
export { default as authModule } from './auth';
export { default as configModule } from './config';
export { default as dbModule } from './db';
export { default as loggerModule } from './logger';
export { default as userModule } from './user';
