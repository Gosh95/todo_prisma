import { AbstractRouter } from './router';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

class UserRouter extends AbstractRouter {
  private readonly userController;
  private readonly authMiddleware;

  constructor() {
    super('/api/users');
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post('/', this.userController.createUser);
    this.router.get('/', this.userController.getUsers);
    this.router.get('/:id', this.authMiddleware.isAuthenticated, this.userController.getUserDetail);
    this.router.get('/:id/tasks', this.userController.getUserTasks);
    this.router.put('/:id', this.authMiddleware.isAuthenticated, this.userController.updateUser);
    this.router.delete('/:id', this.authMiddleware.isAuthenticated, this.userController.deleteUser);
  };
}

export default UserRouter;
