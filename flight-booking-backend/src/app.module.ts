import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service'
import { FlightsModule } from './flights/flights.module'


@Module({
  imports: [FlightsModule],
  providers: [PrismaService],
})
export class AppModule {}

