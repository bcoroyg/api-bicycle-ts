import { Request, Response } from 'express';
import { NotFound } from 'http-errors';

export const notFoundHandler = (req: Request, res: Response) => {
  throw new NotFound();
};
