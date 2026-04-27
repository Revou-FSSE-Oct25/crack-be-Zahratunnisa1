import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // ⬅️ import ini

@Module({
  imports: [AuthModule, PrismaModule], // ⬅️ WAJIB
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}
