import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EnduserModule } from './modules/enduser/enduser.module';
import { PrismaModule } from 'libs/prisma/prisma.mdoule';
import { AgentModule } from './modules/agent/agent.module';
import { ClientModule } from 'libs/client/client.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AgentModule,
    EnduserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
