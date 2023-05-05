import { ValidationError } from 'joi';
import ErrorDto from '../commons/dtos/error.dto';

class ErrorMapper {
  static toErrorDto(error: Error): ErrorDto {
    if (error instanceof ValidationError) {
      return {
        name: error.name,
        message: error.details[0].message.replace(/"/g, ''),
      };
    }

    return {
      name: error.name,
      message: error.message,
    };
  }
}

export default ErrorMapper;
