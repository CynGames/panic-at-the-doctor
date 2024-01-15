import { Controller, Post } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { Public } from "../shared/decorator/public-route";

@Controller("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Post("execute")
  async seed() {
    await this.seedService.executeSeed();
  }
}
