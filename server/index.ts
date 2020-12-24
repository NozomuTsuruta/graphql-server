import { ApolloServer, AuthenticationError } from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import schema from "./graphql/schema";
import { models } from "./models";
import express, { Request } from "express";
import dotenv from "dotenv";
import User from "./models/user";
import jwt from "jsonwebtoken";
import cors from 'cors';
import { createServer } from "http";

const app = express();
app.use(cors())
const server = createServer(app);
const port = process.env.PORT || 3301;

// 環境変数を使う
dotenv.config();

/** クライアントから受け取ったトークンで認証 */
const get_current_user = async (req: Request) => {
  const token = req.headers.authorization as string;
  if (!token) return null;

  try {
    // ユーザーを返す
    return jwt.verify(token, process.env.JWT_SECRET as string) as User;
  } catch (e) {
    throw new AuthenticationError("Your session expired. Sign in again.");
  }
};

/** apollo-serverの作成 */
const apollo_server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: async ({ req }) => {
    /** 現在のユーザー */
    const current_user = await get_current_user(req);
    return {
      models,
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      current_user,
    };
  },
});
// expressを使用、パスを/graphqlに設定
apollo_server.applyMiddleware({ app, path: "/graphql" });

server.listen({ port }, () =>
  console.log(`server ready at http://localhost:${port}/graphql`)
);
