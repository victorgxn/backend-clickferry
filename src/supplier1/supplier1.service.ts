import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Supplier1Service {
  private readonly apiUrl: string;
  private readonly token: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('SUPPLIER1_API_URL');
    this.token = this.configService.get<string>('SUPPLIER1_TOKEN');
  }

  async getDepartures(
    date: string,
    departurePort: string,
    arrivalPort: string,
  ): Promise<any[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, {
          params: { date, departurePort, arrivalPort },
          headers: { Authorization: `Bearer ${this.token}` },
        }),
      );
      console.log('Respuesta naviera numero 1:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching departures from Supplier 1:', error);
      return [];
    }
  }
}
