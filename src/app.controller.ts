import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    this.logger.log(`Getting Hello`);
    return this.appService.callSearch();
  }

  @Get('logger')
  getLogger() {
    this.logger.log('Getting Logger');
    this.appService.callLogger();
  }
}
