import { RequestHandler } from 'express';

import { AuthError } from '../commons/errors/error';

class AuthMiddleware {
  static isAuthenticated = (): RequestHandler => {
    return (req, _res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      next(new AuthError('Authentication is required.'));
    };
  };
}

export default AuthMiddleware;
