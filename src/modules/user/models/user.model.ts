import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'User',
  tableName: 'User',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  readonly id: number;

  @Column
  name: string;
}
