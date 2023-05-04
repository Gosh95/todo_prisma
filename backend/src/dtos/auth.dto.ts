import { UserRole } from '@prisma/client';

interface AuthUserDto {
  id: number;
  name: string;
  role: UserRole;
}

export default AuthUserDto;
