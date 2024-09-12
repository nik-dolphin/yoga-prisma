import { createSchema } from "graphql-yoga";
import { createContext } from "./common/context";
import { createServer } from "http";
import { userResolvers } from "./modules/user/user.resolver";
import { productResolvers } from "./modules/product/product.resolver";
import { userTypeDefs } from "./modules/user/user.typeDefs";
import { productTypeDefs } from "./modules/product/product.typeDefs";

const express = require("express");
const { createYoga } = require("graphql-yoga");

const schema = createSchema({
  typeDefs: [userTypeDefs, productTypeDefs],
  resolvers: [userResolvers, productResolvers],
});

const app = express();
app.use(express.json());

const yoga = createYoga({
  schema,
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
