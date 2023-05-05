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
import ErrorHandler from './errors/error.handler';

class App {
  private readonly app: Express;
  private readonly passportAuth: PassportAuth;
  private readonly routers: Router[];
  private readonly errorHandler;

  constructor() {
    this.app = express();
    this.passportAuth = new LocalPassportAuth();
    this.routers = [new TaskRouter(), new UserRouter(), new AuthRouter()];
    this.errorHandler = new ErrorHandler();
    this.initConfig();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandlers();
  }

  private initConfig() {
    dotenv.config();
    this.passportAuth.config();
  }

  private initMiddlewares = () => {
    const { SESSION_SECRET, COOKIE_NAME, COOKIE_MAX_AGE } = process.env;

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(SESSION_SECRET));
    this.app.use(
      expressSession({
        secret: SESSION_SECRET!,
        name: COOKIE_NAME!,
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

  private initErrorHandlers = () => {
    this.app.use(this.errorHandler.handleNotFoundApiPath);
    this.app.use(this.errorHandler.handleErrors);
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
