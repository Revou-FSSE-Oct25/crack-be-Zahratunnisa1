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
  departure: string;

  @IsDateString()
  arrival: string;

  @IsNumber()
  seats: number;
}
