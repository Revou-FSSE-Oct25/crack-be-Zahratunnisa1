import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateBookingDto) {
    const flight = await this.prisma.flight.findUnique({
      where: { id: data.flightId },
    });

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
    return this.prisma.booking.create({
      data: {
        userId,
        flightId: data.flightId,
        seats: data.seats,
      },
    });
  }

  async findMyBookings(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        flight: true,
      },
    });
  }
}
