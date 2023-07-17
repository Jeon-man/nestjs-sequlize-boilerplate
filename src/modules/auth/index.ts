// @index(['./*', '!./index.ts', '!./*.(spec|test).ts'], f => f.path.endsWith('.module') ? `import { default as Module } from '${f.path}';\nexport default Module;\nexport * from '${f.path}';` : `export * from '${f.path}';`)
export * from './access.strategy';
export * from './auth.controller';
export * from './auth.decorator';
export * from './auth.guard';
export * from './auth.module';
export * from './auth.service';
export * from './dto';
export * from './token.service';
import { default as Module } from './auth.module';
export default Module;
