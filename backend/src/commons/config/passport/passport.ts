import passport from 'passport';
import { AuthUser } from '../../../types';

import UserPrismaModel, { UserModel } from '../../../models/user.model';

export interface PassportAuth {
  setStrategy: () => void;
}

abstract class AbstractPassportAuth implements PassportAuth {
  protected readonly userModel: UserModel;

  constructor() {
    this.userModel = new UserPrismaModel();
  }

  config = () => {
    passport.serializeUser((user: AuthUser, done) => {
      done(null, user.id);
    });

    passport.deserializeUser<number>(async (id, done) => {
      try {
        const user = await this.userModel.findById(id);
        done(null, user);
      } catch (e) {
        done(e);
      }
    });

    this.setStrategy();
  };

  abstract setStrategy: () => void;
}

export default AbstractPassportAuth;
