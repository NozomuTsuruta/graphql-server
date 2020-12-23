import { gql } from 'apollo-server-express';

export const comment_schema = gql`
  extend type Query {
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    create_comment(
      text: String!
      article_id: String!
    ): Comment!
    delete_comment(id: ID!): Boolean!
    update_comment(
      id: ID!
      text: String!
    ): Comment!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    article: Article!
    createdAt: Date!
    updatedAt: Date!
  }
`;