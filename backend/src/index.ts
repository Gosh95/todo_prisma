import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

import PassportAuth from './config/passport/passport';
import LocalPassportAuth from './config/passport/passport.local';

import Router from './routes/router';
import UserRouter from './routes/user.router';
import TaskRouter from './routes/task.router';
import AuthRouter from './routes/auth.router';

class App {
  private readonly app: Express;
  private readonly routers: Router[];
  private readonly passportAuth: PassportAuth;

  constructor() {
    this.app = express();
    this.routers = [new TaskRouter(), new UserRouter(), new AuthRouter()];
    this.passportAuth = new LocalPassportAuth();
    this.initConfig();
    this.initMiddlewares();
    this.initRouters();
  }

  private initConfig() {
    dotenv.config();
    this.passportAuth.config();
  }

  private initMiddlewares = () => {
    const { SESSION_SECRET, COOKIE_MAX_AGE } = process.env;

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(SESSION_SECRET));
    this.app.use(
      expressSession({
        secret: SESSION_SECRET!,
        cookie: { path: '/', maxAge: Number(COOKIE_MAX_AGE), signed: true, httpOnly: true, secure: false },
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cors());
  };

  private initRouters = () => {
    this.routers.forEach((router) => this.app.use(router.getApiPath(), router.getRouter()));
  };

  start = () => {
    const { SERVER_PORT } = process.env;

    this.app.listen(SERVER_PORT, () => {
      console.log('=======================================');
      console.log(`Listening to ${SERVER_PORT}...`);
      console.log('=======================================');
    });
  };
}

const app = new App();
app.start();
