import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { DoctorRepository } from "../doctor/doctor.repository";
import { PatientRepository } from "../patient/patient.repository";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DoctorRepository, PatientRepository],
  exports: [JwtStrategy, PassportModule, JwtModule],
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: "7d",
        },
      }),
    }),
  ],
})
export class AuthModule {}
