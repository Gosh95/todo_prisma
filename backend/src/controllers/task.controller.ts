import { RequestHandler } from 'express';

import HttpStatus from '../commons/consts/httpStatus.enum';
import TaskPrismaModel from '../models/task.model';
import TaskMapper from '../commons/utils/task.mapper';
import { NotFoundError } from '../commons/errors';

class TaskController {
  private readonly taskModel;

  constructor() {
    this.taskModel = new TaskPrismaModel();
  }

  createTask: RequestHandler = async (req, res, _next) => {
    const task = await this.taskModel.create({ ...req.body });
    return res.status(HttpStatus['CREATED']).header('Location', `/api/tasks/${task.id}`).send();
  };

  getTasks: RequestHandler = async (_req, res, _next) => {
    const tasks = await this.taskModel.findAll();
    const taskDtos = tasks.map((task) => TaskMapper.toTaskDto(task));
    return res.status(HttpStatus['OK']).send(taskDtos);
  };

  getTaskDetail: RequestHandler = async (req, res, next) => {
    const id = parseInt(req.params['id']);
    const task = await this.taskModel.findById(id);
    if (!task) {
      return next(new NotFoundError(`Not found task by id. (id: ${id})`));
    }
    const taskDetailDto = TaskMapper.toTaskDetailDto(task);
    return res.status(HttpStatus['OK']).send(taskDetailDto);
  };

  updateTask: RequestHandler = async (req, res, _next) => {
    const id = parseInt(req.params['id']);
    await this.taskModel.updateById(id, { ...req.body });
    res.status(HttpStatus['NO_CONTENT']).send();
  };

  deleteTask: RequestHandler = async (req, res, _next) => {
    const id = parseInt(req.params['id']);
    await this.taskModel.deleteById(id);
    res.status(HttpStatus['NO_CONTENT']).send();
  };
}

export default TaskController;
