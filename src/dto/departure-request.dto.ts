import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class DepartureRequestDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsDateString()
  @IsOptional()
  start?: string;

  @IsDateString()
  @IsOptional()
  end?: string;

  @IsString()
  @IsNotEmpty()
  departurePort: string;

  @IsString()
  @IsNotEmpty()
  arrivalPort: string;
}
