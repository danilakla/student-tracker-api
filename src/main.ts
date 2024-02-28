import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import *  as fs from 'fs';
const  httpsOptions={
  key:fs.readFileSync('D:\\key.pem'),
  cert:fs.readFileSync('D:\\cert.pem')
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
