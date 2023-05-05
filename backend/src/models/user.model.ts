import { User, Task } from '@prisma/client';

import CrudModel from './model';
import prisma from '../commons/config/database/prisma.db';

export type UserTasks = User & { tasks: Task[] };

export interface UserModel extends CrudModel<User, number> {
  findByEmail: (email: string) => Promise<User | null>;

  findUserTasksById: (id: number) => Promise<UserTasks | null>;
}

class UserPrismaModel implements UserModel {
  create = async (user: User): Promise<User> => {
    return await prisma.user.create({ data: { ...user } });
  };

  findAll = async (): Promise<User[]> => {
    return await prisma.user.findMany();
  };

  findById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id: id } });
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: email } });
  };

  findUserTasksById = async (id: number): Promise<UserTasks | null> => {
    return await prisma.user.findUnique({ where: { id: id }, include: { tasks: true } });
  };

  updateById = async (id: number, user: Partial<User>): Promise<User | null> => {
    return await prisma.user.update({ where: { id: id }, data: { ...user } });
  };

  deleteById = async (id: number): Promise<void> => {
    await prisma.user.delete({ where: { id: id } });
  };
}

export default UserPrismaModel;
