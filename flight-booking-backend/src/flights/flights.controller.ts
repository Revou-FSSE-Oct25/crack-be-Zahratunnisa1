import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightsDto } from './dto/create-flights.dto';
import { UpdateFlightsDto } from './dto/update-flights.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('flights')
@UseGuards(RolesGuard)
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  // GET → semua bisa akses
  @Get()
  async getAllFlights() {
    return this.flightsService.findAll();
  }

  // POST → admin only
  @Post()
  @Roles('admin')
  async createFlights(@Body() createFlightsDto: CreateFlightsDto) {
    return this.flightsService.createFlights(createFlightsDto);
  }

  // PUT → admin only
  @Put(':id')
@Roles('admin')
async updateFlight(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateFlightsDto: UpdateFlightsDto
) {
  return this.flightsService.updateFlight(id, updateFlightsDto);
}

  // DELETE → admin only
  @Delete(':id')
  @Roles('admin')
  async deleteFlight(@Param('id') id: number) {
    return this.flightsService.deleteFlight(id);
  }
}


