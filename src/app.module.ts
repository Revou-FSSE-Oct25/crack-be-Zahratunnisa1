import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma/prisma.service';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FlightsModule,
    BookingsModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

