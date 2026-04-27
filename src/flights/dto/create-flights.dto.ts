import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateFlightsDto {
  @IsString()
  airline: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsNumber()
  price: number;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsNumber()
  seats: number;
}
