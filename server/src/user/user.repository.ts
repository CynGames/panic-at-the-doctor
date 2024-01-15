import { Injectable } from "@nestjs/common";
import { UpdateUserInput, User } from "./model/user";
import { SignupDto, ValidRoles } from "../auth/model/plain/auth";
import { db } from "../core/db/db";
import { userTable } from "../core/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

@Injectable()
export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await db.query.userTable.findMany();

    if (!users) {
      throw new Error("No users found");
    }

    return users.map((user) => {
      return { ...user, role: user.role as ValidRoles };
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await db.query.userTable.findFirst({
      where: (user) => eq(user.email, email),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { ...user, role: user.role as ValidRoles };
  }

  async findOneByID(userID: string): Promise<User> {
    const user = await db.query.userTable.findFirst({
      where: (user) => eq(user.id, userID),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { ...user, role: user.role as ValidRoles };
  }

  async create(data: SignupDto): Promise<User> {
    const user = await db
      .insert(userTable)
      .values({
        id: randomUUID(),
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        isActive: data.isActive,
        role: data.role,
      })
      .returning();

    console.log("User Created");

    return user[0] as User;
  }

  async update(data: UpdateUserInput): Promise<User> {
    const user = await db.query.userTable.findFirst({
      where: (user) => eq(user.id, data.id),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { ...user, role: user.role as ValidRoles };
  }
}
