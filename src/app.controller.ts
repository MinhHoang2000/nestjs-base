import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VERSION_API_V1 } from './common/constant';

@Controller({ path: 'test', version: VERSION_API_V1 })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.log();
    return this.appService.getHello();
  }
}
