import { Sequelize } from "sequelize";
import UserFactory from "./user";
import dotenv from 'dotenv';
dotenv.config;

const database = process.env.DB_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

let sequelize = new Sequelize(database, 'postgres', 'postgres', {
  dialect: 'postgres',
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: UserFactory(sequelize)
  //add models here if needed
}

export { db, sequelize };
