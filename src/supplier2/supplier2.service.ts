import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Supplier2Service {
  private readonly apiUrl: string;
  private readonly username: string;
  private readonly password: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('SUPPLIER2_API_URL');
    this.username = this.configService.get<string>('SUPPLIER2_USERNAME');
    this.password = this.configService.get<string>('SUPPLIER2_PASSWORD');
  }

  private async getAuthToken() {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.apiUrl}/login`,
        {},
        {
          auth: {
            username: this.username,
            password: this.password,
          },
        },
      ),
    );
    return response.data.token;
  }

  async getDepartures(route: string, start: string, end: string): Promise<any> {
    const token = await this.getAuthToken();
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/timetable/${route}`, {
        params: { start, end },
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    console.log('Respuesta naviera numero dos:', response.data.departures);
    return response.data.departures;
  }
}
