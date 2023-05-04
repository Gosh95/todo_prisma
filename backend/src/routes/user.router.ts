import { AbstractRouter } from './router';
import UserController from '../controllers/user.controller';

class UserRouter extends AbstractRouter {
  private readonly userController;

  constructor() {
    super('/api/users');
    this.userController = new UserController();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post('/', this.userController.createUser);
    this.router.get('/', this.userController.getUsers);
    this.router.get('/:id', this.userController.getUserDetail);
    this.router.get('/:id/tasks', this.userController.getUserTasks);
    this.router.put('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  };
}

export default UserRouter;
