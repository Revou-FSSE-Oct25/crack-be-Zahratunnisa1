import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateBookingDto) {
    try {
      console.log('=== BOOKING DEBUG ===');
      console.log('userId:', userId);
      console.log('data:', data);

      const flight = await this.prisma.flight.findUnique({
        where: { id: data.flightId },
      });

      console.log('flight:', flight);

      if (!flight) {
        throw new NotFoundException('Flight tidak ditemukan');
      }

      if (flight.seats < data.seats) {
        throw new BadRequestException('Kursi tidak cukup');
      }

      // Kurangi kursi
      await this.prisma.flight.update({
        where: { id: data.flightId },
        data: {
          seats: flight.seats - data.seats,
        },
      });

      // Buat booking
      const booking = await this.prisma.booking.create({
        data: {
          userId,
          flightId: data.flightId,
          seats: data.seats,
        },
      });

      console.log('booking success:', booking);

      return booking;

    } catch (error) {
      console.error('❌ ERROR BOOKING:', error);
      throw error;
    }
  }

  async findMyBookings(userId: number) {
    try {
      console.log('GET MY BOOKINGS userId:', userId);

      return await this.prisma.booking.findMany({
        where: { userId },
        include: {
          flight: true,
        },
      });

    } catch (error) {
      console.error('❌ ERROR GET BOOKINGS:', error);
      throw error;
    }
  }
}
