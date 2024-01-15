import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";
import { User } from "../user/model/user";
import {
  AuthResponse,
  LoginDto,
  SignupDto,
  ValidRoles,
} from "./model/plain/auth";
import { UserRepository } from "../user/user.repository";
import { DoctorRepository } from "../doctor/doctor.repository";
import { PatientRepository } from "../patient/patient.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly userRepository: UserRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  private getJwtToken(id: string, role: string) {
    return this.jwtService.sign(
      { id, role },
      {
        expiresIn: "7d",
      },
    );
  }

  async signUp(signupInput: SignupDto): Promise<AuthResponse> {
    const user = await this.create(signupInput);
    const token = this.getJwtToken(user.id, user.role);

    return {
      token,
      user,
    };
  }

  async signIn(loginInput: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail({ email });
    const token = this.getJwtToken(user.id, user.role);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException("Email / Password do not match");
    }

    return {
      token,
      user,
    };
  }

  async validateUser(userID: string): Promise<User> {
    const user = await this.usersService.findOneByID({ id: userID });

    if (!user.isActive) {
      throw new UnauthorizedException(
        `User ${user.firstName} ${user.lastName} is blocked.`,
      );
    }

    user.password = "";

    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id, user.role);

    return {
      token,
      user,
    };
  }

  async create(input: SignupDto): Promise<User> {
    const newUser = {
      ...input,
      password: bcrypt.hashSync(input.password, 10),
    };

    const user = await this.userRepository.create(newUser);

    if (input.role === ValidRoles.Doctor) {
      await this.doctorRepository.createDoctor({
        id: user.id,
        spec: input.spec,
      });
    } else if (input.role === ValidRoles.Patient) {
      await this.patientRepository.createPatient({ id: user.id });
    }

    return user;
  }
}
