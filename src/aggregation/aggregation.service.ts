import { Injectable } from '@nestjs/common';
import { Supplier1Service } from '../supplier1/supplier1.service';
import { Supplier2Service } from '../supplier2/supplier2.service';
import { DepartureResponseDto } from '../dto/departure-response.dto';

@Injectable()
export class AggregationService {
  constructor(
    private readonly supplier1Service: Supplier1Service,
    private readonly supplier2Service: Supplier2Service,
  ) {}

  async getCombinedDepartures(
    date: string,
    start: string,
    end: string,
    departurePort: string,
    arrivalPort: string,
  ): Promise<{ departures: DepartureResponseDto[] }> {
    try {
      const supplier1Departures = await this.supplier1Service.getDepartures(
        date,
        departurePort,
        arrivalPort,
      );

      const route = `${departurePort}${arrivalPort}`;
      const supplier2Departures = await this.supplier2Service.getDepartures(
        route,
        start || date,
        end || date,
      );

      const formattedSupplier1 = supplier1Departures.map((departure) => ({
        departurePort: departure.departurePort,
        arrivalPort: departure.arrivalPort,
        departureTime: departure.departure,
        arrivalTime: departure.arrival,
        shipName: departure.ship.name,
        shipType: departure.ship.tipo,
        supplier: 1,
      }));

      const formattedSupplier2 = Object.keys(supplier2Departures).flatMap(
        (date) =>
          supplier2Departures[date].map((departure) => ({
            departurePort,
            arrivalPort,
            departureTime: `${date}T${departure.time}`,
            arrivalTime: departure.arrival,
            shipName: departure.ship.name,
            shipType: departure.ship.type,
            supplier: 2,
          })),
      );

      const combinedDepartures = [...formattedSupplier1, ...formattedSupplier2];

      console.log('Respuesta informacion combinada:', combinedDepartures);
      return { departures: combinedDepartures };
    } catch (error) {
      console.error(
        'Error fetching departures en el servicio de agregación:',
        error,
      );
      return { departures: [] };
    }
  }
}
