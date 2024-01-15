import { SetMetadata } from "@nestjs/common";

export const HAS_ROLES = "roles";
export const Roles = (...roles: string[]) => SetMetadata(HAS_ROLES, roles);
