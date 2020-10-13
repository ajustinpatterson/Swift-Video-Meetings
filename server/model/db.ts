import { Sequelize, DataTypes } from "sequelize";
import dotenv from 'dotenv';
import UserFactory from "./user";
dotenv.config;

let sequelize = new Sequelize('zoomapp', 'postgres', 'postgres', {
  dialect: 'postgres',
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: UserFactory(sequelize)
  //add models here if needed
}

export { db, sequelize };
