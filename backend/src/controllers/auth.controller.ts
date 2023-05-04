import { RequestHandler } from 'express';
import passport from 'passport';

import { AuthUser } from '../types';
import HttpStatus from '../consts/httpStatus.enum';
import AuthMapper from '../utils/auth.mapper';

class AuthController {
  login: RequestHandler = (req, res, next) => {
    passport.authenticate('local', (err: Error, user: AuthUser) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('Failed to authentication'));
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const authUserDto = AuthMapper.toAuthUserDto(user);
        res.status(HttpStatus['OK']).send(authUserDto);
      });
    })(req, res, next);
  };

  logout: RequestHandler = (req, res, next) => {
    req.logOut((err: Error) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
      });
    });
    res.clearCookie('connect.sid').status(HttpStatus['NO_CONTENT']).send();
  };
}

export default AuthController;
