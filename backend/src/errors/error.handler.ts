import { RequestHandler, ErrorRequestHandler } from 'express';

import HttpStatus from '../consts/httpStatus.enum';
import { AuthError, NotFoundError } from './error';
import ErrorMapper from '../utils/error.mapper';

class ErrorHandler {
  handleNotFoundApiPath: RequestHandler = (_req, _res, next) => {
    next(new NotFoundError('The requested api path was not found.'));
  };

  handleErrors: ErrorRequestHandler = (error: Error, _req, res, _next) => {
    const errorDto = ErrorMapper.toErrorDto(error);
    switch (true) {
      case error instanceof NotFoundError:
        res.status(HttpStatus['NOT_FOUND']).send(errorDto);
      case error instanceof AuthError:
        res.status(HttpStatus['UNAUTHORIZED']).send(errorDto);
      default:
        res.status(HttpStatus['SERVER_ERROR']).send(errorDto);
    }
  };
}

export default ErrorHandler;
