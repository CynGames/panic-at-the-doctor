import { WebSocketGateway } from "@nestjs/websockets";
import WebSocket from "ws";
import { uuidv7 } from "uuidv7";
import * as util from "util";

export const AppGateway = () =>
  WebSocketGateway({
    path: "/ws",
  });

export interface AppWebsocket extends WebSocket {
  id: string;
  userId: null | string;
}

// ! BIG HACK
export const extendWebSocket = (socket: WebSocket): void => {
  (socket as AppWebsocket).id = uuidv7();
  (socket as AppWebsocket).userId = null;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (socket as any)[util.inspect.custom] = () =>
    `[AppWebsocket] 
    id = ${(socket as AppWebsocket).id}
    userId = ${(socket as AppWebsocket).userId}
    `;
};
