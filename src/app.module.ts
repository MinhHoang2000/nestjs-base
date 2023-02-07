import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './configs';
import { LoggerModule } from 'nestjs-pino';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomLogger } from './utils/logger';
import { Connection } from 'mongoose';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // config env
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.${process.env.NODE_ENV}.env`,
      load: [getConfig],
    }),
    // config log api
    LoggerModule.forRoot({
      renameContext: 'context',
      pinoHttp: getConfig().PINO_HTTP_CONFIG,
    }),
    // for database
    MongooseModule.forRoot('mongodb://localhost:27017', {
      connectionFactory: (connection: Connection) => {
        connection.on('connected', () => {
          CustomLogger.log('is connected');
        });
        connection.on('disconnected', () => {
          CustomLogger.log('DB disconnected');
        });
        connection.on('error', (error: any) => {
          CustomLogger.error('DB connection failed! for error: ', error);
        });
        return connection;
      },
    }),
    // for routes
    // RouterModule.forRoutes(routes),
    RouterModule.register(routes),
    // module
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
