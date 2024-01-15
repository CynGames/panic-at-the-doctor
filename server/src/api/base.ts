import { WsResponse } from "@nestjs/websockets";

export class AppError extends Error {
  event: string;
  cause?: unknown;

  constructor(
    event: string,
    message: string,
    { cause }: { cause?: unknown } = {},
  ) {
    super();
    this.event = event;
    this.message = message;
    this.cause = cause;
  }
}

export const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;
  return new AppError("error-unhandled", "UnhandledError", {
    cause: JSON.stringify(error),
  });
};

export const makeResponse = <T = any>(
  dataOrError: WsResponse<T> | AppError,
): WsResponse<T> => {
  if (dataOrError instanceof AppError)
    return {
      event: dataOrError.event,
      data: dataOrError.message as T,
    };

  return {
    event: dataOrError.event,
    data: dataOrError.data as T,
  };
};
