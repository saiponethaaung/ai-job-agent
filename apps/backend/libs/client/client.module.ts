import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCRAPER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'scraper-client',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientModule {
  constructor() {}
}
