import { BadRequest } from 'http-errors';
import config from '../config';
import models from '../database/models';
import { sendMail } from '../utils/mailer/nodemailer';
import tokenEmailHandler from '../utils/tokenEmailHandler';

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
    const data = {
      ...user,
    };
    //Generar token de Email
    const tokenEmail = tokenEmailHandler();
    data.token = tokenEmail.token;
    //Creación de la url
    const url = `${config.hostFrontend}/confirmation-account/${data.token}`;
    //Email options
    const mail = {
      from: config.mailUser,
      to: data.email,
      subject: 'Activate Account',
      file: 'confirm-account',
      url,
    };
    //Envio de correo
    try {
      await sendMail(mail);
    } catch (error: any) {
      throw new BadRequest(error.response);
    }
    const registeredUser = await models.User.create(data);
    return registeredUser;
  }

  async confirmAccountUser(token:string) {
    const user = await models.User.findOne({token});
    if(!user){
      throw new BadRequest('We did not find a user with this token.')
    }
    user.verified = true;
    user.token = undefined;
    await user.save();
    return user._id;
  }
}
