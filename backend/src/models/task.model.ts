import { Task } from '@prisma/client';

import CrudModel from '.';
import db from '../commons/config/database';

export interface TaskModel extends CrudModel<Task, number> {}

class TaskPrismaModel implements TaskModel {
  create = async (task: Task): Promise<Task> => {
    return await db.task.create({ data: { ...task } });
  };

  findAll = async (): Promise<Task[]> => {
    return await db.task.findMany();
  };

  findById = async (id: number): Promise<Task | null> => {
    return await db.task.findUnique({ where: { id: id } });
  };

  updateById = async (id: number, user: Partial<Task>): Promise<Task | null> => {
    return await db.task.update({ where: { id: id }, data: { ...user } });
  };

  deleteById = async (id: number): Promise<void> => {
    await db.task.delete({ where: { id: id } });
  };
}

export default TaskPrismaModel;
