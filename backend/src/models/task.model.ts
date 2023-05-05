import { Task } from '@prisma/client';

import CrudModel from '.';
import prisma from '../commons/config/database';

export interface TaskModel extends CrudModel<Task, number> {}

class TaskPrismaModel implements TaskModel {
  create = async (task: Task): Promise<Task> => {
    return await prisma.task.create({ data: { ...task } });
  };

  findAll = async (): Promise<Task[]> => {
    return await prisma.task.findMany();
  };

  findById = async (id: number): Promise<Task | null> => {
    return await prisma.task.findUnique({ where: { id: id } });
  };

  updateById = async (id: number, user: Partial<Task>): Promise<Task | null> => {
    return await prisma.task.update({ where: { id: id }, data: { ...user } });
  };

  deleteById = async (id: number): Promise<void> => {
    await prisma.task.delete({ where: { id: id } });
  };
}

export default TaskPrismaModel;
