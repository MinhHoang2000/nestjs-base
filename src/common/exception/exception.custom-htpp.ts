import { HttpException } from '@nestjs/common';
import { ErrorResponseDto } from '../base/base.response';
import { ERROR_CODE } from '../error';
export class CustomHttpException {
  // 400 - BAD_REQUEST
  public static badRequest(errorRes: ErrorResponseDto): void {
    throw new HttpException(errorRes, ERROR_CODE.BAD_REQUEST.CODE);
  }
  // 401 - UNAUTHORIZE
  public static unauthorize(errorRes: ErrorResponseDto): void {
    throw new HttpException(errorRes, ERROR_CODE.UNAUTHORIZE.CODE);
  }
  // 403 - FORBIDDEN
  public static forbidden(errorRes: ErrorResponseDto): void {
    throw new HttpException(errorRes, ERROR_CODE.FORBIDDEN.CODE);
  }
  // 404 - NOT_FOUND
  public static notFound(errorRes: ErrorResponseDto): void {
    throw new HttpException(errorRes, ERROR_CODE.NOT_FOUND.CODE);
  }
  // 500 - INTERNAL_SERVER_ERROR
  public static internal(errorRes: ErrorResponseDto): void {
    throw new HttpException(errorRes, ERROR_CODE.INTERNAL_SERVER_ERROR.CODE);
  }
}
