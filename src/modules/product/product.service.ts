import { GraphQLError } from "graphql";
import prisma from "../../config/database";

export const createProduct = async (
  name: string,
  description: string,
  price: number
) => {
  return await prisma.product
    .create({
      data: {
        name,
        price,
        description,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new GraphQLError("Something went wrong.");
    });
};

export const updateProduct = async (where: any, data: any) => {
  try {
    const product = await prisma.product.update({
      where,
      data,
    });
    return product;
  } catch (error) {
    throw new GraphQLError("Product update failed.");
  }
};

export const getAllProducts = async (limit: number, offset: number) => {
  return await prisma.product.findMany({
    skip: offset ?? 0,
    take: limit ?? 10,
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product
    .findFirst({
      where: { id },
    })
    .catch(() => {
      throw new GraphQLError("Something went wrong");
    });
};
