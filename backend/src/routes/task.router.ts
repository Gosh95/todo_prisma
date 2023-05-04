import { AbstractRouter } from './router';
import TaskController from '../controllers/task.controller';

class TaskRouter extends AbstractRouter {
  private readonly taskController;

  constructor() {
    super('/api/tasks');
    this.taskController = new TaskController();
    this.initRouter();
  }

  initRouter = () => {
    this.router.post('/', this.taskController.createTask);
    this.router.get('/', this.taskController.getTasks);
    this.router.get('/:id', this.taskController.getTaskDetail);
    this.router.put('/:id', this.taskController.updateTask);
    this.router.delete('/:id', this.taskController.deleteTask);
  };
}

export default TaskRouter;
