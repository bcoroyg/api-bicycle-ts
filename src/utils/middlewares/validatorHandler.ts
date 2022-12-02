import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export const validatorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }
  //Limpiando body
  req.body = { ...matchedData(req) };
  next();
};
