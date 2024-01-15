import { User } from "../../../user/model/user";

export enum ValidRoles {
  Doctor = "DOCTOR",
  Patient = "PATIENT",
}

export enum ValidSpecs {
  Dentist = "DENTIST",
  Cardiologist = "CARDIOLOGIST",
  Neurologist = "NEUROLOGIST",
  Generalist = "GENERALIST",
}

export interface SignupDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  role: ValidRoles;
  spec?: ValidSpecs;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
