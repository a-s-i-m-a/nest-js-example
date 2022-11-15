import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('NestApplication');

  const PORT = configService.getPort() || 3000;

  await app.listen(PORT, () =>
    logger.log(`Server was started on port: ${PORT}`),
  );
}
bootstrap();
