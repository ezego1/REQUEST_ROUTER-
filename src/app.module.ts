import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SEARCH',
        transport: Transport.TCP,
        options: {
          host: process.env.SEARCH_HOST,
          port: parseInt(process.env.SEARCH_PORT),
        },
      },
      {
        name: 'LOGGER',
        transport: Transport.TCP,
        options: {
          host: process.env.LOGGER_HOST,
          port: parseInt(process.env.LOGGER_PORT),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
