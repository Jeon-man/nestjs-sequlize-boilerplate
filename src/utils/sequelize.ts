import { Filterable, IncludeOptions, Model } from 'sequelize';

export type IncludeOptionsWithType<T extends Model> = Omit<IncludeOptions, 'where'> & Filterable<T>;
