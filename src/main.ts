import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PREFIX_API } from './common/constant';
import { getConfig } from './configs';
import { CustomLogger } from './utils/logger';
import { buildApiDocs } from './configs/api-docs';
import { HttpExceptionFilter } from './common/exception/exception.http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  app.setGlobalPrefix(PREFIX_API);
  app.useGlobalFilters(new HttpExceptionFilter());
  buildApiDocs(app);
  await app.listen(getConfig().PORT);
  CustomLogger.log(`Server is listening on port ${getConfig().PORT}`);
}
bootstrap();
