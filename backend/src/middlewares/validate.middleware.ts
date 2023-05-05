import { RequestHandler } from 'express';
import Joi from 'joi';

class ValidateMiddleware {
  static validate(schema: Joi.ObjectSchema<any>): RequestHandler {
    return (req, _res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(error);
      }
      next();
    };
  }
}

export default ValidateMiddleware;
