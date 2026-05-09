import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  // ✅ CREATE BOOKING
  @Post()
  create(@Req() req, @Body() data: CreateBookingDto) {
    const userId = req.user.id;

    return this.bookingsService.create(userId, data);
  }

  // ✅ USER BOOKING HISTORY
  @Get('my')
  getMyBookings(@Req() req) {
    const userId = req.user.id;

    return this.bookingsService.findMyBookings(userId);
  }

  // ✅ DETAIL BOOKING
  @Get(':id')
  getBookingById(@Param('id') id: string, @Req() req) {
    return this.bookingsService.findOne(
      Number(id),
      req.user.id,
    );
  }

  // ✅ PAY BOOKING
  @Patch(':id/pay')
  payBooking(@Param('id') id: string, @Req() req) {
    return this.bookingsService.pay(
      Number(id),
      req.user.id,
    );
  }

  // ✅ DELETE BOOKING
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bookingsService.remove(
      Number(id),
      req.user.id,
    );
  }

  // ✅ ADMIN - SEE ALL BOOKINGS
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/all')
  findAllBookings() {
    return this.bookingsService.findAllBookings();
  }
  // ✅ ADMIN CONFIRM
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
@Patch('admin/:id/confirm')
confirmBooking(@Param('id') id: string) {
  return this.bookingsService.confirmBooking(Number(id));
}

// ❌ ADMIN REJECT
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
@Patch('admin/:id/reject')
rejectBooking(@Param('id') id: string) {
  return this.bookingsService.rejectBooking(Number(id));
}

// 🔥 ADMIN DELETE
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
@Delete('admin/:id')
adminDeleteBooking(@Param('id') id: string) {
  return this.bookingsService.adminDeleteBooking(Number(id));
}
}

