export const userTypeDefs = `
    type Query {
      hello: String
      userList: [User]
    }

    type Mutation {
      register(email: String!, password: String!): User
      login(email: String!, password: String!): Token
    }

    type Token {
      token: String
    }

    type User {
      id: Int
      email: String
      password: String
    }
  `
