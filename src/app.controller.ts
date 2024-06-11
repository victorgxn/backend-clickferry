import { Controller, Get, Query } from '@nestjs/common';
import { AggregationService } from './aggregation/aggregation.service';
import { DepartureRequestDto } from './dto/departure-request.dto';
import { DepartureResponseDto } from './dto/departure-response.dto';
import { Validate } from 'class-validator';

@Controller('departures')
export class AppController {
  constructor(private readonly aggregationService: AggregationService) {}

  @Get()
  async getDepartures(
    @Query() params: DepartureRequestDto,
  ): Promise<{ departures: DepartureResponseDto[] }> {
    const { date, start, end, departurePort, arrivalPort } = params;
    return this.aggregationService.getCombinedDepartures(
      date,
      start,
      end,
      departurePort,
      arrivalPort,
    );
  }
}
