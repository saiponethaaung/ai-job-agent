import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'nestjs-scraper-microservice', // Add client ID for better logs
      },
      consumer: {
        groupId: 'scraper-consumer',
      },
    },
  });

  try {
    await app.startAllMicroservices();
    console.log('*** Kafka Microservice Listener Started Successfully ***');
  } catch (error) {
    console.error('*** ERROR STARTING KAFKA MICROSERVICE LISTENER: ***', error);
  }

  await app.listen(process.env.PORT ?? 3030, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT ?? 3030}`,
    );
  });
}
bootstrap();
