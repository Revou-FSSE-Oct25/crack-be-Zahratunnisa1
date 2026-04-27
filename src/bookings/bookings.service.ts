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
      const flight = await this.prisma.flight.findUnique({
        where: { id: data.flightId },
      });

      if (!flight) {
        throw new NotFoundException('Flight tidak ditemukan');
      }

      if (flight.seats < data.seats) {
        throw new BadRequestException('Kursi tidak cukup');
      }

      await this.prisma.flight.update({
        where: { id: data.flightId },
        data: {
          seats: flight.seats - data.seats,
        },
      });

      const booking = await this.prisma.booking.create({
        data: {
          userId,
          flightId: data.flightId,
          seats: data.seats,
          status: "PENDING", // 🔥 tambah ini
          totalPrice: 1000000, // sementara
          expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 menit
        },
      });

      return booking;

    } catch (error) {
      console.error('❌ ERROR BOOKING:', error);
      throw error;
    }
  }

  async findMyBookings(userId: number) {
    await this.checkExpired(); // 🔥 penting

    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        flight: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    await this.checkExpired(); // 🔥 juga di sini

    return this.prisma.booking.findFirst({
      where: { id, userId },
      include: {
        flight: true,
      },
    });
  }

  // 🔥 TARUH DI SINI (bukan bikin class baru)
  async checkExpired() {
    await this.prisma.booking.updateMany({
      where: {
        status: "PENDING",
        expiresAt: {
          lt: new Date(),
        },
      },
      data: {
        status: "EXPIRED",
      },
    });
  }
  async pay(id: number, userId: number) {
  const booking = await this.prisma.booking.findFirst({
    where: { id, userId },
  });

  if (!booking) {
    throw new NotFoundException("Booking tidak ditemukan");
  }

  if (booking.status !== "PENDING") {
    throw new BadRequestException("Booking sudah dibayar / expired");
  }

  return this.prisma.booking.update({
    where: { id },
    data: {
      status: "PAID",
    },
  });
}
}

