export interface PodcastModel {
  id: number;
  podcastName: string;
  episode: string;
  videoId: string;
  categories: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
