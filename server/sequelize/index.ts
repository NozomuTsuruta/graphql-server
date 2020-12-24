require('dotenv').config();
import path from "path";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "develop";

/** sequelizeの設定ファイル */
const config = require(path.join(__dirname, "./config.json"))[env];

/** sequelizeの初期化 */
export const sequelize = new Sequelize(config);
