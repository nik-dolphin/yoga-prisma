import jwt from "jsonwebtoken";
import { Request } from "express";
import { GraphQLError } from "graphql";

export const getUserId = (req: Request) => {
  const secret: string = `${process.env.JWT_SECRET}`;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new GraphQLError("Not authenticated");
  }
  const token = authHeader.replace("Bearer ", "");
  const { userId } = jwt.verify(token, secret) as { userId: number };
  return userId;
};
