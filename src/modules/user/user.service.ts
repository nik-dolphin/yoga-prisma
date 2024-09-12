import prisma from "../../config/database";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const secret: string = `${process.env.JWT_SECRET}`;

export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user
    .create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    .then((res) => {
      return res;
    })
    .catch(() => {
      throw new GraphQLError("Something went wrong.");
    });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new GraphQLError("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new GraphQLError("Invalid credentials");
  }
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
  return { token };
};

export const userList = async () => {
  const users = await prisma.user.findMany();
  return users;
};
