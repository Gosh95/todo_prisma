import { Task } from '@prisma/client';

export type TaskDto = Omit<Task, 'description' | 'updatedAt' | 'dueDate'>;

export type TaskDetailDto = Task;
