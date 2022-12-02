import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';

const withErrorStack = (statusCode: number, error: string, stack: string) => {
  if (config.dev) {
    return { statusCode, msg: error, stack };
  }
  return { statusCode, msg: error };
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
  res.status(err.statusCode ? err.statusCode : (err.statusCode = 500));
  res.json(withErrorStack(err.statusCode, err.message, err.stack));
};

export { logErrors, errorHandler };
