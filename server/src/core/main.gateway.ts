import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from "@nestjs/websockets";
import { AppGateway, AppWebsocket, extendWebSocket } from "../shared/websocket";
import { AppError, makeResponse, normalizeError } from "../api/base";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@AppGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly sockets = new Map<string, AppWebsocket>();

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    setInterval(() => {
      if (configService.get("SOCKETS_DEBUG") !== "true") return;

      console.log("sockets");
      for (const value of this.sockets.values()) {
        console.log(value);
      }
    }, 1000);
  }

  handleConnection(socket: AppWebsocket): void {
    extendWebSocket(socket);
    this.sockets.set(socket.id, socket);
  }

  handleDisconnect(client: AppWebsocket): void {
    this.sockets.delete(client.id);
  }

  getUserSockets(userId: string): Array<AppWebsocket> {
    return Array.from(this.sockets.values()).filter(
      (socket) => socket.userId === userId,
    );
  }

  sendToUser(userId: string, message: unknown): void {
    const sockets = this.getUserSockets(userId);

    for (const socket of sockets) {
      this.sendToSocket(socket, message);
    }
  }

  private sendToSocket(socket: AppWebsocket, message: unknown): void {
    try {
      socket.send(JSON.stringify(message));
    } catch (e: unknown) {
      console.error(normalizeError(e));
    }
  }

  @SubscribeMessage("sign-in")
  handleSignIn(
    @MessageBody() data: {
      token: string;
    },
    @ConnectedSocket() client: AppWebsocket,
  ): void {
    try {
      if (client.userId) return;
      const decodedUser = this.jwtService.decode(data.token) as { id: string };
      client.userId = decodedUser.id;

      this.sendToSocket(
        client,
        makeResponse({
          event: "sign-in-successful",
          data: {},
        }),
      );
    } catch (e: unknown) {
      this.sendToSocket(client, makeResponse(normalizeError(e)));
    }
  }

  @SubscribeMessage("sign-out")
  handleSignOut(@ConnectedSocket() client: AppWebsocket): void {
    try {
      if (client.userId) client.userId = null;

      this.sendToSocket(
        client,
        makeResponse({
          event: "sign-out-successful",
          data: {},
        }),
      );
    } catch (e: unknown) {
      this.sendToSocket(client, makeResponse(normalizeError(e)));
    }
  }
}
