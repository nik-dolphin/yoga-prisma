import { GraphQLError } from "graphql";
import { loginUser, registerUser, userList } from "./user.service";

export const userResolvers = {
  Query: {
    hello: () => "world",
    userList: async (_: any, context: any) => {
      if (!context.userId) {
        throw new GraphQLError(
          "Unauthorized: Login is required to access this resource. Please log in and try again."
        );
      }
      return userList();
    },
  },
  Mutation: {
    register: async (_: any, { email, password }: any) => {
      return registerUser(email, password);
    },
    login: async (_: any, { email, password }: any) => {
      return loginUser(email, password);
    },
  },
};
