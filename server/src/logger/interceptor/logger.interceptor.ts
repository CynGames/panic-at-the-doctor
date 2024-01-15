import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { LoggerHelper } from "../logger-helper";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new LoggerHelper(LoggerInterceptor.name);

  // TODO: Make it work for websockets.

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        const user = response.req.user ?? { role: "NOT SIGNED IN" };

        this.logger.log(
          `${method} ${url} ${statusCode} ${user.role} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
