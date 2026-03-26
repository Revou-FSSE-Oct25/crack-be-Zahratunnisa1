import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  create(@Req() req, @Body() data: CreateBookingDto) {
    const userId = 1; // dari JWT nanti
    return this.bookingsService.create(userId, data);
  }

  @Get('my')
  getMyBookings(@Req() req) {
    const userId = 1;
    return this.bookingsService.findMyBookings(userId);
  }
}
