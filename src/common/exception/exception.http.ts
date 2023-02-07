import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../base/base.response';
import { CustomLogger } from '../../utils/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const httpExceptionRes = exception.getResponse();
    CustomLogger.error(exception.stack);
    response.status(status).json(
      ResponseDto.error(
        {
          code: (httpExceptionRes as any).code
            ? (httpExceptionRes as any).code
            : status,
          message: (httpExceptionRes as any).message,
        },
        status,
      ),
    );
  }
}
