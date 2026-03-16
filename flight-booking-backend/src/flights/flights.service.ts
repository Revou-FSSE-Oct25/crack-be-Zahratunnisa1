import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFlightsDto } from './dto/create-flights.dto';
import { UpdateFlightsDto } from './dto/update-flights.dto';

@Injectable()
export class FlightsService {
  constructor(private readonly prisma: PrismaService) {}

  // GET semua flight
  async findAll() {
    return this.prisma.flight.findMany();
  }

  // POST flight baru
  async createFlight(data: CreateFlightsDto) {
    return this.prisma.flight.create({
      data,
    });
  }

  // PUT update flight berdasarkan id
  async updateFlight(id: string, data: UpdateFlightsDto) {
    return this.prisma.flight.update({
      where: { id },
      data,
    });
  }

  // DELETE flight berdasarkan id
  async deleteFlight(id: string) {
    return this.prisma.flight.delete({
      where: { id },
    });
  }
}







