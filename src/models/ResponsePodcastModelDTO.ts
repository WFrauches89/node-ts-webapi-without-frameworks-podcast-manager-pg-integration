import { PodcastModel } from './PodcastModelDTO';

export interface ResponsePodcastModelDTO {
  statusCode: number;
  body: PodcastModel[];
}
