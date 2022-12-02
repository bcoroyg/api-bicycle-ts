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
    const registeredUser = await models.User.create(user);
    return registeredUser;
  }
}
