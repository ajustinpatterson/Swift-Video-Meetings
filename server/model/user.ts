import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DATABASE;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const port = process.env.PORT;

const sequelize = new Sequelize(`postgres://${userName}:${password}@localhost:${port}/${dbName}`)
//const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");

interface UserAttributes {
  id: string
  name: string
  email: string
  bio? : string
  avatar?: string
}

class User extends Model<UserAttributes>
  implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public bio: string;
    public avatar: string;
};

User.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "users",
    sequelize,
  }
);
