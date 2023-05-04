import { Task } from '@prisma/client';

import CrudModel from './model';
import prisma from '../config/database/prisma.db';

export interface TaskModel extends CrudModel<Task, number> {}

class TaskPrismaModel implements TaskModel {
  async create(task: Task): Promise<Task> {
    return await prisma.task.create({ data: { ...task } });
  }

  async findAll(): Promise<Task[]> {
    return await prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return await prisma.task.findUnique({ where: { id: id } });
  }

  async updateById(id: number, user: Partial<Task>): Promise<Task | null> {
    return await prisma.task.update({ where: { id: id }, data: { ...user } });
  }

  async deleteById(id: number): Promise<void> {
    await prisma.task.delete({ where: { id: id } });
  }
}

export default TaskPrismaModel;
