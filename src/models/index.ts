import {Config} from "../config/db.config";
import { Comments } from "../models/comments.models"


import {Sequelize} from "sequelize-typescript";
const sequelize = new Sequelize(Config.DB, Config.USER, Config.PASSWORD, {
  host: Config.HOST,
  dialect: "postgres",
  // operatorsAliases: false,
  // models: (__dirname + '/models')
});

const db: Record<string, any> = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comments = Comments(sequelize, Sequelize);

export default  db;
