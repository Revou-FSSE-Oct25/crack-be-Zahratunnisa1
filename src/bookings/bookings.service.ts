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
        throw new NotFoundException('Flight didnt found');
      }

      if (flight.seats < data.seats) {
        throw new BadRequestException('Seats doesnt available');
      }

      // update seats
      await this.prisma.flight.update({
        where: { id: data.flightId },
        data: {
          seats: flight.seats - data.seats,
        },
      });

      // create booking + passengers
      const booking = await this.prisma.booking.create({
        data: {
          userId,
          flightId: data.flightId,
          seats: data.seats,
          status: "PENDING",
          totalPrice: flight.price * data.seats,
          expiresAt: new Date(Date.now() + 1000 * 60 * 15),

          passengers: {
            create: data.passengers,
          },
        },
        include: {
          passengers: true,
          flight: true,
        },
      });

      return booking;

    } catch (error) {
      console.error('❌ ERROR BOOKING:', error);
      throw error;
    }
  }

  async findMyBookings(userId: number) {
    await this.checkExpired();

    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        flight: true,
        passengers: true, // 🔥 penting
      },
    });
  }

  async findOne(id: number, userId: number) {
    await this.checkExpired();

    return this.prisma.booking.findFirst({
      where: { id, userId },
      include: {
        flight: true,
        passengers: true, // 🔥 penting
      },
    });
  }

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

  // ✅ PAY BOOKING
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

// 🔥 CANCEL / DELETE BOOKING
async remove(id: number, userId: number) {

  const booking = await this.prisma.booking.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!booking) {
    throw new Error("Booking tidak ditemukan");
  }

  // ✅ hapus semua passenger dulu
  await this.prisma.passenger.deleteMany({
    where: {
      bookingId: id,
    },
  });

  // ✅ baru hapus booking
  return this.prisma.booking.delete({
    where: {
      id,
    },
  });
}
  
  async findAllBookings() {
  return this.prisma.booking.findMany({
    include: {
      user: true,
      flight: true,
      passengers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
// ✅ ADMIN CONFIRM BOOKING
async confirmBooking(id: number) {
  return this.prisma.booking.update({
    where: { id },
    data: {
      status: 'CONFIRMED',
    },
  });
}

// ❌ ADMIN REJECT BOOKING
async rejectBooking(id: number) {
  return this.prisma.booking.update({
    where: { id },
    data: {
      status: 'REJECTED',
    },
  });
}

// 🔥 ADMIN DELETE BOOKING
async adminDeleteBooking(id: number) {

  await this.prisma.passenger.deleteMany({
    where: {
      bookingId: id,
    },
  });

  return this.prisma.booking.delete({
    where: { id },
  });
}
}
