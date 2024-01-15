import { ValidRoles } from "../../auth/model/plain/auth";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  role: ValidRoles;
}

export interface FindUserByEmailInput {
  email: string;
}

export interface FindUserByIdInput {
  id: string;
}

export interface UpdateUserInput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: ValidRoles;
}

export interface UpdateBlockStatusInput {
  email: string;
  isActive: boolean;
}
