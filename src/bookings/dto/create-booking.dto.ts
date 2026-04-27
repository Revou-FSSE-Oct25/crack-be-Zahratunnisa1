import { IsInt, IsString, IsEmail } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
 flightId!: number;

  @IsInt()
 seats!: number;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;
}


