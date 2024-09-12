import { getUserId } from './auth';
import { Request } from 'express';

export const createContext = ({ req }: { req: Request }) => {
  try {
    const userId = getUserId(req);
    return { userId };
  } catch (error) {
    return {};
  }
};
