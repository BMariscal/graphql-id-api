const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const logger = require("pino")();

const db = {};

const { config } = require("../../config.js");

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  config.dbConfig,
);

logger.info("Initializing models");
fs.readdirSync("./src/models")
  .filter((file) => !file.includes("index.js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

logger.info("Applying relational associations");
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
