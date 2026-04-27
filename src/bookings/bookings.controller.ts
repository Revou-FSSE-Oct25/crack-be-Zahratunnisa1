import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';


@UseGuards(JwtGuard)

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  // ✅ Endpoint buat booking baru, harus login
  @Post()
  create(@Req() req, @Body() data: CreateBookingDto) {
    const userId = req.user.id; // ambil dari token
    return this.bookingsService.create(userId, data);
  }

  // ✅ Endpoint riwayat booking user, harus login
  @Get('my')
  getMyBookings(@Req() req) {
    const userId = req.user.id; // ambil dari token
    return this.bookingsService.findMyBookings(userId);
  }

@Get(':id')
getBookingById(@Param('id') id: string, @Req() req) {
  return this.bookingsService.findOne(Number(id), req.user.id);
}

@Patch(':id/pay')
payBooking(@Param('id') id: string, @Req() req) {
  return this.bookingsService.pay(Number(id), req.user.id);
}

}
