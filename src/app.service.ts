import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('SEARCH') private readonly searchService: ClientProxy,
    @Inject('LOGGER') private readonly loggerService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.loggerService.connect();
    await this.searchService.connect();
  }

  callSearch() {
    const start = Date.now();
    const pattern = { cmd: 'search' };
    const data = {};
    return this.searchService
      .send<string>(pattern, data)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - start })),
      );
  }

  callLogger() {
    const start = Date.now();
    const pattern = { cmd: 'search' };
    const payload = {};
    return this.loggerService
      .send(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - start })),
      );
  }
}
