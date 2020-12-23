import { gql } from 'apollo-server-express';

export const user_schema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    current_user: User
  }

  extend type Mutation {
    delete_user: Boolean!
    update_user(name: String!, password: String!): User!
    sign_up(name: String!, email: String!, password: String!): Token!
    sign_in(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    articles: [Article!]
    comments: [Comment!]
    createdAt: Date!
    updatedAt: Date!
  }
`;
