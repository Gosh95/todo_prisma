import { Task, User } from '@prisma/client';

export type UserDto = Omit<User, 'password' | 'updatedAt'>;

export type UserDetailDto = Omit<User, 'password'>;

export type UserTasksDto = UserDetailDto & { tasks: Omit<Task, 'userId'>[] };
