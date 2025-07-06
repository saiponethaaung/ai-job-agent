import { Global, Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    // ClientsModule.registerAsync({
    //   clients: [
    //     {
    //       name: 'SCRAPER',
    //       useFactory: () => ({
    //         transport: Transport.KAFKA,
    //         options: {
    //           client: {
    //             clientId: 'scraper',
    //             brokers: ['localhost:9092'],
    //           },
    //           consumer: {
    //             groupId: 'scraper-consumer',
    //           },
    //         },
    //       }),
    //     },
    //   ],
    // }),
  ],
})
export class ClientModule {
  constructor() {}
}
