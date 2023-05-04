import { Task } from '@prisma/client';

import { TaskDto, TaskDetailDto } from '../dtos/task.dto';

class TaskMapper {
  static toTaskDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      userId: task.userId,
      createdAt: task.createdAt,
    };
  }

  static toTaskDetailDto(task: Task): TaskDetailDto {
    return task;
  }
}

export default TaskMapper;
