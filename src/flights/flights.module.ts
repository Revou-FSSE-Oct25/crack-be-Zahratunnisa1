import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService, PrismaService],
})

@Module({
  imports: [AuthModule], // 🔥 TAMBAHKAN INI
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}

