const dotenv = require("dotenv");
dotenv.config();

const faker = require("faker");
const express = require("express");
const pkg = require("apollo-server-express");
const { ApolloServer, gql } = pkg;
const logger = require("pino")();

const { config } = require("../config.js");
const db = require("./models");
const resolvers = require("./resolvers.js");
const schema = require("./schema.js");

const server = new ApolloServer({
  context: { db },
  resolvers,
  typeDefs: gql(schema),
});

const app = express();
server.applyMiddleware({ app });

db.sequelize //TODO: move to a script; run after db healthcheck;
  .sync()
  .then(() => {
    logger.info("SEEDING DB with Mock Data");
    // user 1 records
    return db.user.create({ //use Promise.all instead of nesting. 
      dob: faker.date.past(20),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  })
  .then(() => {
    return db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.future(5),
      imageURL: faker.image.avatar(),
      userId: 1,
    });
  })
  .then(() => {
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.past(10),
      imageURL: faker.image.avatar(),
      userId: 1,
    });
    logger.info("SEEDED DB with Mock Data");
    return;
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
app.listen({ port: config.server.port }, () => {
  logger.info(
    `🚀 Server ready at http://localhost:${config.server.port}${server.graphqlPath}`,
  );
}),
  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received.");
    logger.info("Closing http server.");
    app.close(() => {
      logger.info("Http server closed.");
    });
  });
