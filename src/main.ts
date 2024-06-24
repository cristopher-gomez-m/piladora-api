import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true });
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
});
  await app.listen(3000);
}
bootstrap();
