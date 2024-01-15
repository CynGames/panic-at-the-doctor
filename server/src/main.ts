import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from "@nestjs/platform-ws";
import { LoggerInterceptor } from "./logger/interceptor/logger.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: "*" },
  });

  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalInterceptors(new LoggerInterceptor());

  const config = new DocumentBuilder()
    .setTitle("Doctor Panic")
    .setDescription("The Doctor Panic API description")
    .setVersion("1.0")
    .build();

  patchNestJsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(8000);
};

void bootstrap();
