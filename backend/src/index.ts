import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import UserRouter from './routes/user.router';
import TaskRouter from './routes/task.router';
import Router from './routes/router';

class App {
  private readonly app: Express;
  private readonly routers: Router[];

  constructor() {
    this.app = express();
    this.routers = [new TaskRouter(), new UserRouter()];
    this.initConfig();
    this.initMiddlewares();
    this.initRouters();
  }

  private initConfig() {
    dotenv.config();
  }

  private initMiddlewares = () => {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  };

  private initRouters = () => {
    this.routers.forEach((router) => this.app.use(router.getApiPath(), router.getRouter()));
  };

  start = () => {
    const serverPort = process.env.SERVER_PORT;
    this.app.listen(serverPort, () => {
      console.log('=======================================');
      console.log(`Listening to ${serverPort}...`);
      console.log('=======================================');
    });
  };
}

const app = new App();
app.start();
