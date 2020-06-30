const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { GraphQLDate } = require("graphql-iso-date");
const moment = require("moment");

const compareDates = (dateTimeA, dateTimeB)=> {
  var momentA = moment(dateTimeA,"DD/MM/YYYY");
  var momentB = moment(dateTimeB,"DD/MM/YYYY");
  if (momentA > momentB) return false;
  else if (momentA < momentB) return true;
  else return false;
}

module.exports = {
  Date: GraphQLDate,
  MedicalRec: {
    user: (parent, args, context, info) => parent.getUser(),
    expired: (parent, { id }, { db }, info) => {
      //returns Boolean confirming medical rec expiration.
      return db.medicalRec
        .findOne({
          where: {
            userId: parent.id,
          },
        })
        .then((medicalR) => compareDates(medicalR.expiresAt, new Date()))
        .catch((e) => console.log(e));
    },
  },
  Identification: {
    user: (parent, args, context, info) => parent.getUser(),
    expired: (parent, { id }, { db }, info) => {
      //returns Boolean confirming ID expiration.
      return db.identification
        .findOne({
          where: { userId: parent.id },
        })
        .then((idCard) => compareDates(idCard.expiresAt, new Date()))
        .catch((e) => console.log(e));
    },
  },
  User: {
    // returns a user record, medical recommendation, and id.
    medicalRec: (parent, { id }, { db }, info) =>
      db.medicalRec.findOne({ where: { userId: parent.id } }),
    identification: (parent, { id }, { db }, info) =>
      db.identification.findOne({ where: { userId: parent.id } }),
  },
  Query: {
    expireAt: (date) => new Date(date),
    dob: (date) => new Date(date),
    users: (parent, args, { db }, info) => db.user.findAll(),
    identification: (parent, { id }, { db }, info) =>
      db.identification.findByPk(id),
    medicalRec: (parent, { id }, { db }, info) => db.medicalRec.findByPk(id),
    user: (parent, { id }, { db }, info) => db.user.findByPk(id),
    expired: (parent, { id }, { db }, info) => db.user.findByPk(id),
  },
  Mutation: {
    createUser: (
      parent,
      { firstName, lastName, dob, identification, medicalRec },
      { db },
      info,
    ) =>
      db.user.create({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        identification: identification,
        medicalRec: medicalRec,
      }),
    createID: (
      parent,
      { number, state, expiresAt, imageURL, userId },
      { db },
      info,
    ) => {
      const user = db.user.findByPk(userId);
      if (!user) {
        throw new AuthenticationError("not authorized");
      } else {
        return db.identification.create({
          number: number,
          state: state,
          expiresAt: expiresAt,
          imageURL: imageURL,
          userId: userId,
        });
      }
    },
    createMedicalRec: (
      parent,
      { number, issuer, state, expiresAt, imageURL, userId },
      { db },
      info,
    ) => {
      const user = db.user.findByPk(userId);
      if (!user) {
        throw new AuthenticationError("not authorized");
      } else {
        return db.medicalRec.create({
          number: number,
          issuer: issuer,
          state: state,
          expiresAt: expiresAt,
          imageURL: imageURL,
          userId: userId,
        });
      }
    },
    updateID: (
      parent,
      { number, state, expiresAt, imageURL, id },
      { db },
      info,
    ) =>
      db.identification.update(
        {
          number: number,
          state: state,
          expiresAt: expiresAt,
          imageURL: imageURL,
        },
        {
          where: {
            id: id,
          },
        },
      ),
    updateMedicalRec: (
      parent,
      { number, issuer, state, expiresAt, id, imageURL },
      { db },
      info,
    ) =>
      db.medicalRec.update(
        {
          number: number,
          issuer: issuer,
          state: state,
          expiresAt: expiresAt,
          imageURL: imageURL,
        },
        {
          where: {
            id: id,
          },
        },
      ),

    deleteMedicalRec: (parent, { id }, { db }, info) =>
      db.medicalRec.destroy({
        where: {
          id: id,
        },
      }),
    deleteID: (parent, { id }, { db }, info) =>
      db.identification.destroy({
        where: {
          id: id,
        },
      }),
  },
};
