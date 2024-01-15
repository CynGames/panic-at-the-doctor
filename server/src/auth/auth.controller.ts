import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, LoginDto } from "./model/plain/auth";
import { Public } from "../shared/decorator/public-route";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @AppApiOkResponse({ type: AuthResponseDto })
  @Public()
  @Post("signup")
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Public()
  @Post("signin")
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Get("revalidate")
  async revalidateToken(@Req() req: any) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException("User not found or token invalid");
    }
    return this.authService.revalidateToken(user);
  }
}
