import { Filterable, IncludeOptions, ModelStatic } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { Include, isNotNullable } from './types';
export type IncludeOptionsWithType<T extends Model> = Omit<IncludeOptions, 'where'> & Filterable<T>;

export const isModelClass = <T>(m: T): m is Include<T, ModelStatic<Model<any, any>>> =>
  isNotNullable(m) && (m as any).prototype instanceof Model;
