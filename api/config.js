const envSchema = require("env-schema");
const S = require("fluent-schema");

const { name } = require("./package.json");

const configData = envSchema({
  data: process.env,
  schema: S.object()
    .prop("APP_DOMAIN", S.string().default("localhost"))
    .prop("MYSQL_DATABASE", S.string())
    .prop("MYSQL_USER", S.string())
    .prop("DB_TYPE", S.string().default("mysql"))
    .prop("MYSQL_HOST", S.string())
    .prop("MYSQL_PASSWORD", S.string())
    .prop("LOGGER_HOST", S.string())
    .prop("LOGGER_LEVEL", S.string().default("info"))
    .prop("NODE_ENV", S.string().default("development").required())
    .prop("PORT", S.number().default(8000).required()),
});

const config = {
  appDomain: configData.APP_DOMAIN,
  env: configData.NODE_ENV,
  logger: {
    appname: `api-${configData.NODE_ENV}`,
    host: configData.LOGGER_HOST,
    level: configData.LOGGER_LEVEL,
    port: configData.LOGGER_PORT,
  },
  dbName: configData.MYSQL_DATABASE,
  dbUser: configData.MYSQL_USER,
  dbPassword: configData.MYSQL_PASSWORD,
  dbConfig: {
    host: configData.MYSQL_HOST,
    dialect: configData.DB_TYPE,
    protocol: configData.DB_TYPE,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  },
  name,
  server: {
    port: configData.PORT,
  },
};

module.exports = { config };
