import { Sequelize } from "sequelize";
import UserFactory from "./user";
import dotenv from 'dotenv';
dotenv.config;

let sequelize = new Sequelize(process.env.DB_NAME, 'postgres', 'postgres', {
  dialect: 'postgres',
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: UserFactory(sequelize)
  //add models here if needed
}

export { db, sequelize };