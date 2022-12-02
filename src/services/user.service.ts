import models from '../database/models';

export class UserService {
  private static _userServiceInstance: UserService;

  constructor() {}

  public static getInstance() {
    if (!UserService._userServiceInstance) {
      UserService._userServiceInstance = new UserService();
    }
    return UserService._userServiceInstance;
  }

  //cantidad de usuarios
  async countUsers() {
    const total = await models.User.countDocuments();
    return total;
  }
  //lista usuarios
  async getUsers() {
    const users = await models.User.find({});
    return users;
  }
  //mostrar un usuario
  async getUserById(id: string) {
    const user = await models.User.findById(id);
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await models.User.findOne({ email });
    return user;
  }

  async getUserByToken(token: string) {
    const user = await models.User.findOne({ token });
    return user;
  }
}
