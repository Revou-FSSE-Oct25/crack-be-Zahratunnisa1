import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService, PrismaService],
})
export class FlightsModule {}

