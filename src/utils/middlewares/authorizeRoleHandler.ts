import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces';

const authorizeRoleHandler = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = <IUser>req.user;
    if (!roles.includes(user.role || '')) {
      return res.status(403).json({
        msg: 'You do not have the permitted role to access this resource.',
      });
    }
    next();
  };
};

export default authorizeRoleHandler;
