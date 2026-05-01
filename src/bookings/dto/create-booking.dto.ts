import {
  IsInt,
  IsString,
  IsEmail,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

// 🔹 DTO untuk 1 penumpang
class PassengerDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;
}

// 🔹 DTO utama booking
export class CreateBookingDto {
  @IsInt()
  flightId!: number;

  @IsInt()
  seats!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  passengers!: PassengerDto[];
}



