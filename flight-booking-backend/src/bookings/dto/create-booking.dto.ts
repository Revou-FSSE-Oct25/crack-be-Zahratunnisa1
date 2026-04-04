import { IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  flightId: number;

  @IsInt()
  seats: number;
}
