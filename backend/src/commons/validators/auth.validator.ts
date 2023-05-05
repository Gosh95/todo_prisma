import Joi from 'joi';

import { ANY_REQUIRED_MESSAGE, ANY_EMPTY_MESSAGE, ANY_EMAIL_MESSAGE } from './validator.message';

const emailValidator = Joi.string()
  .label('Email')
  .trim()
  .email()
  .required()
  .empty()
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
    ...ANY_EMAIL_MESSAGE,
  });

const passwordValidation = Joi.string()
  .label('Password')
  .trim()
  .required()
  .empty()
  .messages({
    ...ANY_REQUIRED_MESSAGE,
    ...ANY_EMPTY_MESSAGE,
  });

const LoginSchema = Joi.object({
  email: emailValidator,
  password: passwordValidation,
});

export default LoginSchema;
