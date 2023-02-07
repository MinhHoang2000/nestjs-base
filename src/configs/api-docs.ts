import { INestApplication } from '@nestjs/common';
import { VersioningType } from '@nestjs/common/enums';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PREFIX_API, VERSION_API_V1 } from '../common/constant';

export const buildApiDocs = (app: INestApplication) => {
  app.enableVersioning({
    defaultVersion: VERSION_API_V1,
    type: VersioningType.URI,
  });
  const documentBuilder = new DocumentBuilder()
    .setTitle('nestjs backend')
    .setDescription('Nestjs rank API document')
    .setVersion(`v${VERSION_API_V1}`)
    .addTag('Nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup(`${PREFIX_API}/:version/docs`, app, document);
};
