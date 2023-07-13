// @index(['./*', '!./index.ts', '!./*.(spec|test).ts'], f => f.path.endsWith('.module') ? `import { default as Module } from '${f.path}';\nexport default Module;\nexport * from '${f.path}';` : `export * from '${f.path}';`)
export * from './models';
export * from './user.controller';
import { default as Module } from './user.module';
export default Module;
export * from './user.module';
export * from './user.service';
