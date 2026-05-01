import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateFlightsDto {
  @IsString()
  airline!: string;

  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsDateString()
  departureTime!: string;

  @IsDateString()
  arrivalTime!: string;

  @IsInt()
  price!: number;

  @IsInt()
  seats!: number;
}
