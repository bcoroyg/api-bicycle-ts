import express, { Application } from 'express';
import logger from 'morgan';
import config from '../config';
import routerAPI from '../routes';
import dbConnection from './../lib';

export class Server {
  private app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = <string>config.port;

    //middlewares
    this.middlewares();

    //routes
    this.routes();

    //database
    this.dbConnect();

    //server listen
    //this.listen()
  }

  middlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    routerAPI(this.app);
  }

  async dbConnect() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running');
    });
  }
}
