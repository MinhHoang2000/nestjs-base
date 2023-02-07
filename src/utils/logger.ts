import { Logger } from '@nestjs/common';

export class CustomLogger {
  static log(message: string, ...rest: any) {
    Logger.log(`Info: ${message} ${rest || ''}`);
  }

  static error(error: string, ...rest: any) {
    Logger.error(`Error: ${error} ${rest || ''}`);
  }

  static warn(warn: string, ...rest: any) {
    Logger.warn(`Warn: ${warn} ${rest || ''}`);
  }

  static debug(debug: string, ...rest: any) {
    Logger.debug(`Debug: ${debug} ${rest || ''}`);
  }
}
