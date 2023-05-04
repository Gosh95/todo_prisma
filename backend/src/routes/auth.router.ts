import { AbstractRouter } from './router';
import AuthController from '../controllers/auth.controller';

class AuthRouter extends AbstractRouter {
  private readonly authController: AuthController;

  constructor() {
    super('/api/auth');
    this.authController = new AuthController();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post('/login', this.authController.login);
    this.router.delete('/logout', this.authController.logout);
  };
}

export default AuthRouter;
