import { User } from '@prisma/client';

import AuthUserDto from '../commons/dtos/auth.dto';

class AuthMapper {
  static toAuthUserDto = (user: User): AuthUserDto => {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  };
}

export default AuthMapper;
