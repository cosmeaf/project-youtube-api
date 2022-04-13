import {Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model{
  id:number;
  role_id: number;
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  cell_phone_number: string;
  phone_number: string;
}

export const User = sequelize.define<UserInstance>('User_model', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  role_id:{
    type: DataTypes.INTEGER
  },
  first_name:{
    type: DataTypes.STRING
  },
  last_name:{
    type: DataTypes.STRING
  },
  user_email:{
    type: DataTypes.STRING
  },
  user_password:{
    type: DataTypes.STRING
  },
  cell_phone_number:{
    type: DataTypes.STRING
  },
  phone_number:{
    type: DataTypes.STRING
  },

},{
  tableName: 'tbl_users',
  timestamps: false
});