import { ERROR_CODE } from '../error';
import { formatDateTime } from '../../utils/date';
import { PageMetaDto } from './base.page';

export class ResponseDto<T = null> {
  statusCode: number;
  result: OkResponseDto<T>;
  meta: {
    [props: string]: unknown;
    page?: PageMetaDto;
  };
  errorCode: number;
  message: string;
  time: string;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
  }

  public static ok<T>(res: OkResponseDto<T>, statusCode = 200): ResponseDto<T> {
    return new ResponseDto<T>({
      statusCode,
      message: 'success',
      result:
        {
          data: res.data,
          meta: res?.meta || null,
        } || null,
      time: formatDateTime(Date.now()),
    });
  }

  public static error(
    error: ErrorResponseDto,
    statusCode = ERROR_CODE.BAD_REQUEST.CODE,
  ): ResponseDto {
    return new ResponseDto({
      statusCode,
      errorCode: error?.code || ERROR_CODE.UNKNOWN.CODE,
      message: error?.message || ERROR_CODE.UNKNOWN.MESSAGE,
      time: formatDateTime(Date.now()),
    });
  }
}

export interface ErrorResponseDto {
  code?: number;
  message?: string;
}

export interface OkResponseDto<T> {
  data?: T;
  meta?: Record<string, unknown>;
}
