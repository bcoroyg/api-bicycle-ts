import crypto from 'crypto';
import { IToken } from './interfaces';

const tokenEmailHandler = (expireToken: number) => {
  const token: IToken = {
    token: crypto.randomBytes(16).toString('hex'),
  };
  if (expireToken) {
    token.expireToken = Date.now() + expireToken;
  }
  return token;
};

export default tokenEmailHandler;
