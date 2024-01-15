import { Global, Module } from "@nestjs/common";
import { EventPublisherService } from "./event-publisher.service";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MainGateway } from "./main.gateway";
import { AuthModule } from "../auth/auth.module";
import { db, DbService } from "./db/db";

@Module({
  imports: [AuthModule, EventEmitterModule.forRoot()],
  providers: [
    MainGateway,
    {
      provide: DbService,
      useValue: db,
    },
    EventPublisherService,
  ],
  exports: [MainGateway, DbService, EventPublisherService],
})
export class CoreModule {}
