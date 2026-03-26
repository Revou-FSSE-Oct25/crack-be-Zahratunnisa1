import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFlightsDto } from './dto/create-flights.dto';
import { UpdateFlightsDto } from './dto/update-flights.dto';

@Injectable()
export class FlightsService {
  constructor(private readonly prisma: PrismaService) {}

  // GET semua / filter flight
  async findAll(from?: string, to?: string) {
    return this.prisma.flight.findMany({
      where: {
        ...(from && { from }),
        ...(to && { to }),
      },
    });
  }

  // CREATE flight
  async createFlights(data: CreateFlightsDto) {
    return this.prisma.flight.create({
      data: {
        airline: data.airline,
        from: data.from,
        to: data.to,
        departureTime: new Date(data.departureTime),
        arrivalTime: new Date(data.arrivalTime),
        price: Number(data.price),
        seats: Number(data.seats),
      },
    });
  }

  // UPDATE flight
  async updateFlight(id: number, data: UpdateFlightsDto) {
    return this.prisma.flight.update({
      where: { id },
      data: {
        ...(data.airline && { airline: data.airline }),
        ...(data.from && { from: data.from }),
        ...(data.to && { to: data.to }),
        ...(data.departureTime && {
          departureTime: new Date(data.departureTime),
        }),
        ...(data.arrivalTime && {
          arrivalTime: new Date(data.arrivalTime),
        }),
        ...(data.price && { price: Number(data.price) }),
        ...(data.seats && { seats: Number(data.seats) }),
      },
    });
  }

  // DELETE flight
  async deleteFlight(id: number) {
    return this.prisma.flight.delete({
      where: { id },
    });
  }
}









