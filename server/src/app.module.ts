import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { ConfigModule } from "@nestjs/config";
import { DoctorModule } from "./doctor/doctor.module";
import { PatientModule } from "./patient/patient.module";
import { ZodValidationPipe } from "nestjs-zod";
import { SeedModule } from "./seed/seed.module";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AuthGuard } from "./shared/guard/auth.guard";
import { AllFilter } from "./shared/exceptions/filter";
import { NotificationModule } from "./notification/notification.module";
import { RolesGuard } from "./shared/guard/roles.guard";

@Module({
  imports: [
    UserModule,
    AuthModule,
    CoreModule,
    PatientModule,
    AppointmentModule,
    SeedModule,
    NotificationModule,
    DoctorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllFilter,
    },
  ],
})
export class AppModule {}
