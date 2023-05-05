import Joi from 'joi';

import {
  ANY_REQUIRED_MESSAGE,
  ANY_EMPTY_MESSAGE,
  ANY_ONLY_MESSAGE,
  ANY_EMAIL_MESSAGE,
  STRING_MIN_MESSAGE,
  STRING_MAX_MESSAGE,
  STRING_PASSWORD_PATTERN_MESSAGE,
} from './validator.message';
import ValidatorRegex from './validator.regex';

const nameValidator = Joi.string()
  .label('Name')
  .trim()
  .min(2)
  .max(60)
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
    ...STRING_MIN_MESSAGE,
    ...STRING_MAX_MESSAGE,
  });

const emailValidator = Joi.string()
  .label('Email')
  .trim()
  .email()
  .max(120)
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
    ...ANY_EMAIL_MESSAGE,
    ...STRING_MAX_MESSAGE,
  });

const passwordValidator = Joi.string()
  .label('Password')
  .trim()
  .pattern(new RegExp(ValidatorRegex['PASSWORD_REGEX']))
  .messages({
    ...STRING_PASSWORD_PATTERN_MESSAGE,
  });

const roleValidator = Joi.string()
  .label('Role')
  .trim()
  .valid('USER', 'ADMIN')
  .only()
  .messages({
    ...ANY_ONLY_MESSAGE,
  });

export const UserCreateSchema = Joi.object({
  name: nameValidator.required().empty(),
  email: emailValidator.required().empty(),
  password: passwordValidator.required().empty(),
});

export const UserUpdateSchema = Joi.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator,
  role: roleValidator,
});
