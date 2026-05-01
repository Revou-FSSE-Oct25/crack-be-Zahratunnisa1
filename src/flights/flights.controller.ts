import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightsDto } from './dto/create-flights.dto';
import { UpdateFlightsDto } from './dto/update-flights.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  // GET semua flight
  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.flightsService.findAll(from, to);
  }

  // GET by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(Number(id));
  }

  // ✅ CREATE (tanpa auth dulu)
  @Post()
  createFlights(@Body() createFlightsDto: CreateFlightsDto) {
    return this.flightsService.createFlights(createFlightsDto);
  }

  // UPDATE
  @Put(':id')
  updateFlight(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlightsDto: UpdateFlightsDto
  ) {
    return this.flightsService.updateFlight(id, updateFlightsDto);
  }

  // DELETE
  @Delete(':id')
  deleteFlight(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService.deleteFlight(id);
  }
}



