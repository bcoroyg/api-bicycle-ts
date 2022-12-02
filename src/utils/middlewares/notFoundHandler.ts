import { Request, Response } from 'express';
import createError from 'http-errors';

export const notFoundHandler = (req: Request, res: Response) => {
  throw new createError.NotFound();
};
