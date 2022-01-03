import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return `Hi at ${new Date()}`;
  }

  getProfile(): void {
    this.httpService
      .get('http://pa-db-rest/pa_user_profile')
      .subscribe((response) => {
        console.log(`XXX => ${JSON.stringify(response.data)}`);
      });
  }
}
