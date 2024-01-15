import { Body, Controller, Get, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/requests/update-user.dto";
import { Roles } from "../shared/decorator/roles";
import { User } from "./model/user";
import { FindUserDto } from "./dto/requests/find-user.dto";
import { UpdateBlockStatusDto } from "./dto/requests/update-block-status.dto";
import { Public } from "../shared/decorator/public-route";

@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Roles("DOCTOR")
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.service.findAll();
  }

  @Roles("DOCTOR")
  @Put("email")
  async findOneUser(@Body() body: FindUserDto): Promise<User> {
    return this.service.findOneByEmail({ email: body.email });
  }

  @Roles("DOCTOR")
  @Put("id")
  async updateUser(@Body() body: UpdateUserDto): Promise<User> {
    return this.service.update({
      id: body.id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      isActive: body.isActive,
      role: body.role,
    });
  }

  @Roles("DOCTOR")
  @Put("block")
  async updateBlockStatus(@Body() body: UpdateBlockStatusDto): Promise<User> {
    return this.service.block({ email: body.email, isActive: body.isActive });
  }
}
