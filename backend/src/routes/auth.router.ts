import { AbstractRouter } from './router';
import AuthController from '../controllers/auth.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import LoginSchema from '../commons/validators/auth.validator';

class AuthRouter extends AbstractRouter {
  private readonly authController: AuthController;

  constructor() {
    super('/api/auth');
    this.authController = new AuthController();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post('/', ValidateMiddleware.validate(LoginSchema), this.authController.login);
    this.router.delete('/', this.authController.logout);
  };
}

export default AuthRouter;
