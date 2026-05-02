import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightsDto } from './dto/create-flights.dto';
import { UpdateFlightsDto } from './dto/update-flights.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  // ✅ PUBLIC (boleh semua user)
  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.flightsService.findAll(from, to);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(Number(id));
  }

  // 🔐 ADMIN ONLY
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  createFlights(@Body() createFlightsDto: CreateFlightsDto) {
    return this.flightsService.createFlights(createFlightsDto);
  }

  // 🔐 ADMIN ONLY
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  updateFlight(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlightsDto: UpdateFlightsDto
  ) {
    return this.flightsService.updateFlight(id, updateFlightsDto);
  }

  // 🔐 ADMIN ONLY
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteFlight(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService.deleteFlight(id);
  }
}
