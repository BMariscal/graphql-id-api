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

db.sequelize
  .sync()
  .then(() => {
    logger.info("SEEDING DB with Mock Data");
    // user 1 records
    db.user.create({
      dob: faker.date.past(20),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.future(5),
      imageURL: faker.image.avatar(),
      userId: 1,
    });
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.past(10),
      imageURL: faker.image.avatar(),
      userId: 1,
    });

    //user 2 records
    db.user.create({
      dob: faker.date.past(50),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.future(10),
      imageURL: faker.image.avatar(),
      userId: 2,
    });
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.future(10),
      imageURL: faker.image.avatar(),
      userId: 2,
    });

    //user 3 records
    db.user.create({
      dob: faker.date.past(40),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.past(1),
      imageURL: faker.image.avatar(),
      userId: 3,
    });
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.past(2),
      imageURL: faker.image.avatar(),
      userId: 3,
    });

    //user 4 records
    db.user.create({
      dob: faker.date.past(27),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.past(1),
      imageURL: faker.image.avatar(),
      userId: 4,
    });
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.past(2),
      imageURL: faker.image.avatar(),
      userId: 4,
    });

    //user 5 records
    db.user.create({
      dob: faker.date.past(32),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    db.identification.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      expiresAt: faker.date.future(1),
      imageURL: faker.image.avatar(),
      userId: 5,
    });
    db.medicalRec.create({
      number: faker.finance.account(),
      state: faker.address.state(),
      issuer: faker.lorem.sentence(),
      expiresAt: faker.date.future(2),
      imageURL: faker.image.avatar(),
      userId: 5,
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
app.listen({ port: config.server.port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${config.server.port}${server.graphqlPath}`,
  );
}),
  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    app.close(() => {
      console.log("Http server closed.");
    });
  });
