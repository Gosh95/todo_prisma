import { RequestHandler } from 'express';

import { AuthError } from '../commons/errors/error';

class AuthMiddleware {
  isAuthenticated: RequestHandler = (req, _res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    next(new AuthError('Authentication is required.'));
  };
}

export default AuthMiddleware;
