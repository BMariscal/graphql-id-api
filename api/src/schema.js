module.exports = `
  scalar Date
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    dob: Date!
    identification: Identification
    medicalRec: MedicalRec
  }
  type MedicalRec {
    id: ID!
    number: String!
    issuer: String!
    state: String!
    expiresAt: Date!
    imageURL: String!
    expired: Boolean
    userId: ID!
    user: User
  }
  type Identification {
    id: ID!
    number: String!
    state: String!
    expiresAt: Date!
    imageURL: String!
    expired: Boolean
    userId: ID!
    user: User
  }
  type Query {
    dob: Date
    expireAt: Date
    identification(userId: ID!): Identification
    medicalRec(userId: ID!): MedicalRec
    expired(userId: ID!): Boolean
    user(id: ID!): User
    users: [User]
  }
  type Mutation {
    createUser(firstName: String, lastName:String, dob: Date, identification:ID, medicalRec:ID): User!

    createID(number: String, state: String, expiresAt: Date, imageURL: String, userId: ID!): Identification!
    updateID(id: ID!, number: String, state: String, expiresAt: Date, imageURL: String): [Int!]!
    deleteID(id: ID!): Int!

    createMedicalRec(number: String, issuer: String, state: String, expiresAt: Date, imageURL: String, userId:ID): MedicalRec!
    updateMedicalRec(id: ID!, number: String, issuer: String, state: String, expiresAt: Date, imageURL: String): [Int!]!
    deleteMedicalRec(id: ID!): Int!
  }
`;
