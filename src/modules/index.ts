// @index(['./*', '!./index.ts', '!./*.(spec|test).ts'], f => `export * from '${f.path}';`)?
export * from './app';
export * from './auth';
export * from './config';
export * from './db';
export * from './logger';
export * from './modules';
export * from './user';
// @endindex

import * as Modules from './modules';

export { Modules };
