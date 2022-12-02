import { sign } from 'jsonwebtoken';
import config from '../config';

const generateToken = (user: any) => {
  return new Promise((resolve, reject) => {
    const { _id, email, name, role } = user;
    const payload = { uid: _id, email, name, role };
    sign(
      payload,
      <string>config.jwtSecret,
      { expiresIn: config.jwtTimeExpire },
      (err, token) => {
        if (err) {
          reject('Error, do not generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateToken;
