import { BadRequest } from 'http-errors';
import models from '../database/models';

export class AuthService {
  private static _authServiceInstance: AuthService;

  constructor() {}

  public static getInstance() {
    if (!AuthService._authServiceInstance) {
      AuthService._authServiceInstance = new AuthService();
    }
    return AuthService._authServiceInstance;
  }

  //register user
  async registerUser(user: any) {
    const userDB = await models.User.findOne({ email: user.email });
    if (userDB) {
      throw new BadRequest('The email already exists, try again!');
    }
    const registeredUser = await models.User.create(user);
    return registeredUser;
  }
}
