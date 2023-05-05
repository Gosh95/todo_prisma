import { AbstractRouter } from './router';
import TaskController from '../controllers/task.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ValidateMiddleware from '../middlewares/validate.middleware';
import { TaskCreateSchema, TaskUpdateSchema } from '../commons/validators/task.validator';

class TaskRouter extends AbstractRouter {
  private readonly taskController;
  private readonly authMiddleware;

  constructor() {
    super('/api/tasks');
    this.taskController = new TaskController();
    this.authMiddleware = new AuthMiddleware();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post(
      '/',
      this.authMiddleware.isAuthenticated,
      ValidateMiddleware.validate(TaskCreateSchema),
      this.taskController.createTask
    );
    this.router.get('/', this.taskController.getTasks);
    this.router.get('/:id', this.taskController.getTaskDetail);
    this.router.put(
      '/:id',
      this.authMiddleware.isAuthenticated,
      ValidateMiddleware.validate(TaskUpdateSchema),
      this.taskController.updateTask
    );
    this.router.delete('/:id', this.authMiddleware.isAuthenticated, this.taskController.deleteTask);
  };
}

export default TaskRouter;
