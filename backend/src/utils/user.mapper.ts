import { User } from '@prisma/client';

import { UserTasks } from '../models/user.model';
import { UserDto, UserDetailDto, UserTasksDto } from '../dtos/user.dto';

class UserMapper {
  static toUserDto = (user: User): UserDto => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  };

  static toUserDetailDto = (user: User): UserDetailDto => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };

  static toUserTasksDto = (userTasks: UserTasks): UserTasksDto => {
    return {
      id: userTasks.id,
      name: userTasks.name,
      email: userTasks.email,
      role: userTasks.role,
      createdAt: userTasks.createdAt,
      updatedAt: userTasks.updatedAt,
      tasks: userTasks.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })),
    };
  };
}

export default UserMapper;
