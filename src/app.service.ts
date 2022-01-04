import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CoreV1Api, KubeConfig, V1PodList } from '@kubernetes/client-node';

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

  async listAllPods(): Promise<V1PodList> {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(CoreV1Api);

    return k8sApi.listNamespacedPod('pa-dev').then((res) => res.body);
  }
}
