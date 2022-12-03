import express, { Application } from 'express';
import logger from 'morgan';
import SwaggerUI from 'swagger-ui-express';
import config from '../config';
import routerAPI from '../routes';
import { errorHandler, logErrors, notFoundHandler } from '../utils/middlewares';
import dbConnection from './../lib';

import openApiConfiguration from '../documentation';

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
    // desactivar en test
    config.test ? null : this.dbConnect();

    //middlewares error
    this.errors();

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
     // activar en desarrollo
    config.dev
      ? this.app.use(
          '/docs',
          SwaggerUI.serve,
          SwaggerUI.setup(openApiConfiguration)
        )
      : null;
  }

  async dbConnect() {
    await dbConnection();
  }

  errors() {
    //Error 404
    this.app.use(notFoundHandler);
    //Middlewares de Errores
    this.app.use(logErrors);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running');
    });
  }

  //server testing app
  get appServer(): Application {
    return this.app;
  }
}
