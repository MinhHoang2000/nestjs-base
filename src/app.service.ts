import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino/PinoLogger';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {
    // Optionally you can set context for logger in constructor or ...
    this.logger.setContext(AppService.name);
  }
  getHello(): string {
    return 'Hello World!';
  }
  log() {
    this.logger.info('ok');
  }
}
