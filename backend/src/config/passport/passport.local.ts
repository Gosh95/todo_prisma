import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import AbstractPassportAuth from './passport';

const AUTH_FAILED_MESSAGE = 'Incorrect email or password.';

class LocalPassportAuth extends AbstractPassportAuth {
  constructor() {
    super();
  }

  setStrategy = () => {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          const user = await this.userModel.findByEmail(email);
          if (!user) {
            return done(null, false, { message: AUTH_FAILED_MESSAGE });
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          return isPasswordMatch ? done(null, user) : done(null, false, { message: AUTH_FAILED_MESSAGE });
        } catch (e) {
          return done(e);
        }
      })
    );
  };
}

export default LocalPassportAuth;
