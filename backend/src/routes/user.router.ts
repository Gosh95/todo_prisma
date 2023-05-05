import { AbstractRouter } from './router';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ValidateMiddleware from '../middlewares/validate.middleware';
import { UserCreateSchema, UserUpdateSchema } from '../commons/validators/user.validator';

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
    this.router.post('/', ValidateMiddleware.validate(UserCreateSchema), this.userController.createUser);
    this.router.get('/', this.authMiddleware.isAuthenticated, this.userController.getUsers);
    this.router.get('/:id', this.authMiddleware.isAuthenticated, this.userController.getUserDetail);
    this.router.get('/:id/tasks', this.authMiddleware.isAuthenticated, this.userController.getUserTasks);
    this.router.put(
      '/:id',
      this.authMiddleware.isAuthenticated,
      ValidateMiddleware.validate(UserUpdateSchema),
      this.userController.updateUser
    );
    this.router.delete('/:id', this.authMiddleware.isAuthenticated, this.userController.deleteUser);
  };
}

export default UserRouter;
