import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CoreV1Api, KubeConfig, V1PodList } from '@kubernetes/client-node';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return `Hi at ${new Date()}`;
  }

  async listAllPods(): Promise<V1PodList> {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(CoreV1Api);

    return k8sApi.listNamespacedPod('k8s-101').then((res) => res.body);
  }
}
