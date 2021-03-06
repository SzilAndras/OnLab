import {Role} from '../enums/user-role.enum';

export interface UserInterface {
  id?: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  token?: string;
  password?: string;
  role?: Role;
}
