import ErrorDto from '../dtos/error.dto';

class ErrorMapper {
  static toErrorDto = (error: Error): ErrorDto => {
    return {
      name: error.name,
      message: error.message,
    };
  };
}

export default ErrorMapper;
