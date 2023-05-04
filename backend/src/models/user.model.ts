import { User, Task } from '@prisma/client';

import CrudModel from './model';
import prisma from '../config/database/prisma.db';

export type UserTasks = User & { tasks: Task[] };

export interface UserModel extends CrudModel<User, number> {
  findByEmail(email: string): Promise<User | null>;

  findUserTasksById(id: number): Promise<UserTasks | null>;
}

class UserPrismaModel implements UserModel {
  async create(user: User): Promise<User> {
    return await prisma.user.create({ data: { ...user } });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email: email } });
  }

  async findUserTasksById(id: number): Promise<UserTasks | null> {
    return await prisma.user.findUnique({ where: { id: id }, include: { tasks: true } });
  }

  async updateById(id: number, user: Partial<User>): Promise<User | null> {
    return await prisma.user.update({ where: { id: id }, data: { ...user } });
  }

  async deleteById(id: number): Promise<void> {
    await prisma.user.delete({ where: { id: id } });
  }
}

export default UserPrismaModel;
