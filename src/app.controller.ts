import { V1PodList } from '@kubernetes/client-node';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/xxx')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pods')
  async listAllPods(): Promise<V1PodList> {
    return this.appService.listAllPods();
  }
}
