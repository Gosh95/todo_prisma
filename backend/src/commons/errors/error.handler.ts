import { RequestHandler, ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';

import HttpStatus from '../consts/httpStatus.enum';
import { AuthError, NotFoundError } from './error';
import ErrorMapper from '../../utils/error.mapper';

class ErrorHandler {
  handleNotFoundApiPath: RequestHandler = (_req, _res, next) => {
    next(new NotFoundError('The requested api path was not found.'));
  };

  handleErrors: ErrorRequestHandler = (error: Error, _req, res, _next) => {
    const errorDto = ErrorMapper.toErrorDto(error);
    switch (true) {
      case error instanceof NotFoundError: {
        return res.status(HttpStatus['NOT_FOUND']).send(errorDto);
      }
      case error instanceof AuthError: {
        return res.status(HttpStatus['UNAUTHORIZED']).send(errorDto);
      }
      case error instanceof ValidationError: {
        return res.status(HttpStatus['BAD_REQUEST']).send(errorDto);
      }
      default: {
        return res.status(HttpStatus['SERVER_ERROR']).send(errorDto);
      }
    }
  };
}

export default ErrorHandler;
