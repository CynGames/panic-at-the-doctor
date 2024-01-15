import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [CoreModule],
  providers: [NotificationService],
})
export class NotificationModule {}
