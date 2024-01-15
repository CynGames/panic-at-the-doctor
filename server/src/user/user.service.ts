import { Injectable, NotFoundException } from "@nestjs/common";
import {
  FindUserByEmailInput,
  FindUserByIdInput,
  UpdateBlockStatusInput,
  UpdateUserInput,
  User,
} from "./model/user";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  findAll(): Promise<User[]> {
    try {
      return this.repository.findAll();
    } catch (error) {
      throw new NotFoundException(`No users found.`);
    }
  }

  findOneByEmail(input: FindUserByEmailInput): Promise<User> {
    try {
      return this.repository.findOneByEmail(input.email);
    } catch (error) {
      throw new NotFoundException(`${input.email} not found.`);
    }
  }

  findOneByID(input: FindUserByIdInput): Promise<User> {
    try {
      return this.repository.findOneByID(input.id);
    } catch (error) {
      throw new NotFoundException(`${input.id} not found.`);
    }
  }

  async update(input: UpdateUserInput): Promise<User> {
    try {
      return await this.repository.update(input);
    } catch (error) {
      throw new NotFoundException(`Error updating user.`);
    }
  }

  async block(input: UpdateBlockStatusInput): Promise<User> {
    const user = await this.repository.findOneByEmail(input.email);

    if (!user) {
      throw new NotFoundException(`No user with the email: ${input.email}`);
    }

    try {
      return this.repository.update({ ...user, isActive: input.isActive });
    } catch (error) {
      throw new NotFoundException(`Error updating user's block status.`);
    }
  }
}
