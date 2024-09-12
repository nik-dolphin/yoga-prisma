import { GraphQLError } from "graphql";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.service";

export const productResolvers = {
  Query: {
    product: async (_parent: any, { id }: { id: number }) => {
      return await getProductById(id);
    },
    products: async (
      _parent: any,
      { limit = 10, offset = 0 }: { limit?: number; offset?: number }
    ) => {
      return await getAllProducts(limit, offset);
    },
  },
  Mutation: {
    createProduct: async (_parent: any, { name, description, price }: any) => {
      return await createProduct(name, description, price);
    },
    updateProduct: async (_: any, { where, data }: any, context: any) => {
      if (!context.userId) {
        throw new GraphQLError(
          "Unauthorized: Login is required to access this resource. Please log in and try again."
        );
      }
      return await updateProduct(where, data);
    },
  },
};
