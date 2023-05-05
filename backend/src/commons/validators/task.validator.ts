import Joi from 'joi';

import {
  ANY_REQUIRED_MESSAGE,
  ANY_EMPTY_MESSAGE,
  ANY_ONLY_MESSAGE,
  STRING_MIN_MESSAGE,
  STRING_MAX_MESSAGE,
  DATE_GREATER_MESSAGE,
} from './validator.message';

const titleValidator = Joi.string()
  .label('Title')
  .trim()
  .min(2)
  .max(120)
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
    ...STRING_MIN_MESSAGE,
    ...STRING_MAX_MESSAGE,
  });

const descriptionValidator = Joi.string()
  .label('Description')
  .trim()
  .min(4)
  .max(3000)
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
    ...STRING_MIN_MESSAGE,
    ...STRING_MAX_MESSAGE,
  });

const statusValidator = Joi.string()
  .label('Status')
  .trim()
  .valid('PENDING', 'IN_PROGRESS', 'ARCHIVED')
  .only()
  .required()
  .empty()
  .messages({
    ...ANY_ONLY_MESSAGE,
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
  });

const dueDateValidator = Joi.date()
  .label('DueDate')
  .greater('now')
  .messages({
    ...DATE_GREATER_MESSAGE,
  });

export const TaskCreateSchema = Joi.object({
  title: titleValidator.required().empty(),
  description: descriptionValidator.required().empty(),
  dueDate: dueDateValidator,
});

export const TaskUpdateSchema = Joi.object({
  title: titleValidator,
  description: descriptionValidator,
  status: statusValidator,
  dueDate: dueDateValidator,
});
