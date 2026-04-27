import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightsDto } from './create-flights.dto';

// Semua field optional untuk update
export class UpdateFlightsDto extends PartialType(CreateFlightsDto) {}
