# User Medical Recommendation and Government Issued Id API
***.env file included to facilitate setup.***
## Technologies & Libraries:
    - NodeJS/Express
    - MySQL 
    - Sequelize ORM
    - Docker 
    - graphql
    - Apollo server

---
## Features:
    * Endpoint `/graphql`.
    * Ability to create and retrieve User record.

    * Ability to retrieve/create/edit/delete Identification record. 

    * Ability to retrieve/create/edit/delete Medical Rec record. 

    * Ability to retrieve User's info, Identification and Medical Rec. 

    * `Identification.expired` and `MedicalRec.expired` field returns a Boolean indicating whether the Identification or Medical Rec is expired. 

    * Sample data is seeded on startup within `./api/src/server.js`.

    * You can access the application and make queries in the GraphQL Playground.
---
## How to run:
     * Clone the repo.
     * In the application's root, run `docker-compose up` and wait until it finishes seeding. 
     * Access endpoint at [http://localhost:8000/graphql](http://localhost:8000/graphql)


---
## Schema:


### user
```
+----+-----------+----------+---------------------+---------------------+---------------------+----------------------+
| id | firstName(String) | lastName(String) | dob(Date)                 | createdAt           | updatedAt            |
+----+-----------+----------+---------------------+---------------------+---------------------+----------------------+
|  1 | Corbin            | Kuhlman          | 2015-08-07                | 2020-06-29 05:16:49  | 2020-06-29 05:16:49 |
|  2 | Willy             | Kerluke          | 1989-12-24                | 2020-06-29 05:16:49  | 2020-06-29 05:16:49 |
|  3 | Leslie            | Hoppe            | 1991-02-21                | 2020-06-29 05:16:49  | 2020-06-29 05:16:49 |
|  4 | Madie             | Wisozk           | 1996-08-13                | 2020-06-29 05:16:49  | 2020-06-29 05:16:49 |
|  5 | Colton            | Baumbach         | 1988-12-28                | 2020-06-29 05:16:49  | 2020-06-29 05:16:49 |
+----+-----------+----------+---------------------+---------------------+---------------------+----------------------+
```
### medicalRec
```
+----+----------+---------------------------+--------------+---------------------+--------------------------------------------------------------------------------+
| id | number(String)  | issuer(String)| state(String)| expiresAt(Date) | imageURL(String)          |    createdAt        |     updatedAt     | userId(ID:unique) |
+----+----------+---------------------------+--------------+---------------------+--------------------------------------------------------------------------------+
|  1 | 83858312        | Aliquid.      | Pennsylvania | 2011-03-25      | https://stefvdham/128.jpg | 2020-06-29 01:15:31 | 2020-06-29 01:15:31|      1           |
+----+----------+---------------------------+--------------+---------------------+--------------------------------------------------------------------------------+
```

### identification
```
+----+---------------+----------------+----------------+----------------------+---------------------+---------------------+-------------------+
| id | number(String)| state(String)  | expiresAt(Date)| imageURL(String)     | createdAt           | updatedAt           | userId(ID: unique)| 
+----+----------+--------+---------------------+----------------------------------------------------------------------------------------------+
|  1 |  28916967      | Oregon         | 2023-06-28    | https://s3.imagejpg  | 2020-06-28 23:44:09 | 2020-06-28 23:44:09 |   1               |       
+----+----------------------------------------------------------------------------------------------------------------------------------------+

```




```
type User {
  id: ID!
  firstName: String!
  lastName: String!
  dob: Date!
  identification: Identification!
  medicalRec: MedicalRec!
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

```
```
Relationships:
 - One user to One Identification.
 - One user to One MedicalRec.
 
```


* TODO:
    * Authentication
    * Tests

----
## Sample Queries:

Retrieve one User's info, medical rec and identification:
```
query {
  user(id: "1") {
    id
    firstName
    lastName
    dob
    identification {
      id
      number
      state
      expiresAt
      expired
      imageURL
      userId
    }
    medicalRec {
      id
      number
      issuer
      state
      expiresAt
      expired
      imageURL
      userId
    }
  }
}

```
Create User:
```
mutation {
  createUser(firstName: "Briceida", lastName: "Mariscal", dob: "1990-12-19") {
    id
    lastName
    firstName
    dob
  }
}

```
Create Identification:
```
mutation {
  createID(
    userId: "6"
    number: "124235200DD"
    state: "New York"
    expiresAt: "2020-06-29"
    imageURL: "http://s3-image-path/13235998832.jpg"
  ) {
    id
    number
    state
    expiresAt
    imageURL
    user {
      id
      firstName
      lastName
      dob
    }
  }
}
```

Update Identification:
```
mutation {
  updateID(
    id: "1"
    number: "2341212421"
    state: "Utah"
    expiresAt: "2020-11-06"
    imageURL: "http://s3-imageurl.jpg"
  ) 
  }
```

Update Medical Rec:
```
mutation {
  updateMedicalRec(
    id: "1"
    number: "9892390340202"
    issuer: "Healthcare for All"
    imageURL: "imageurl.jpg"
  ) 
  }
```

Create Medical Rec:
```
mutation {
  createMedicalRec(
    userId: "6"
    number: "124235200DD"
    state: "New York"
    issuer: "department of health of NY"
    expiresAt: "2020-12-19"
    imageURL: "http://s3-image-path/medrec13235998832.jpg"
  ) {
    id
    number
    state
    issuer
    expiresAt
    imageURL
    user {
      id
      firstName
      lastName
      dob
    }
  }
}
```
Delete Medical Rec:
```
mutation {
  deleteMedicalRec(
    id: "1"
  ) 
  }

```

Delete Identification:
```
mutation {
  deleteID(
    id: "1"
  ) 
  }

```


--------



# Card
As a user I would like to be able to use my Medical Recommendation and Government Issued Id for ordering online. I would also like to be able to replace or delete my Medical Recommendation and Id.

# Conversation
Create a service that stores users, med rec, and id's.

This service should allow a user to upload, update, and delete med rec and id data. 

Store users' name, email, and dob.

Store the med rec number, issuer, state, expiration date, and path to the image.

Store the id number, state, expiration date, and path to the image.

If the med rec or Id is expired, return expired.

# Confirmation
Api endpoint that returns a user, medical recommendation, and id.

If the medical recommendation or id are expired return expired.

Ability to delete or update med rec and id.

Create a dev branch and a pull request to master

![Sample Rec](image2.gif)

# Notes 
Use you normal git workflow except on the initial commit add an estimate of how long it will take to complete the exercise. 

For example git commit -m "Initial commit 3 hours" 

# Bonus
Image uploads

Deploy the application

Create a frontend
