import { Router as ExpressRouter } from 'express';

interface Router {
  getRouter: () => ExpressRouter;

  getApiPath: () => string;
}

export abstract class AbstractRouter implements Router {
  protected router: ExpressRouter;
  protected apiPath: string;

  constructor(apiPath: string) {
    this.router = ExpressRouter();
    this.apiPath = apiPath;
  }

  getRouter = () => {
    return this.router;
  };

  getApiPath = () => {
    return this.apiPath;
  };

  protected abstract initRouter: () => void;
}

export default Router;
