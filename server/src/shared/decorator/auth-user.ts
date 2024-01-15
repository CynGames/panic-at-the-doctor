import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const WithAuthUser = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export type AuthUser = {
  id: string;
};
