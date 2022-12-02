import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';

const withErrorStack = (error: any, stack: any) => {
  if (config.dev) {
    return { msg: error, stack };
  }
  return { msg: error };
};

const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  next(err);
};

const errorHandler: ErrorRequestHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500);
  res.json(withErrorStack(err.message, err.stack));
};

export { logErrors, errorHandler };
