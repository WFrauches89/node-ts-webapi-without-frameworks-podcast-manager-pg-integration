import * as http from 'http';
import {
  getAllEpisodes,
  getFilterPodcasts,
  createPodcast,
  updatePodcast,
  partialUpdatePodcast,
  deletePodcast,
} from './controllers/podcastController';
import { Routes } from './routes/routes';
import { HttpMethods } from './utils/httpmethods';

export async function routeManager(
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage>,
) {
  //queryString
  //http://localhost:3333/api/episodes?p=name
  const [baseURL, queryString] = request.url?.split('?') ?? [', '];

  if (request.method === HttpMethods.GET && baseURL === Routes.LIST) {
    await getAllEpisodes(request, response);
  }

  if (request.method === HttpMethods.GET && baseURL === Routes.PODCAST) {
    await getFilterPodcasts(request, response, queryString);
  }

  if (request.method === HttpMethods.POST && baseURL === Routes.PODCAST) {
    await createPodcast(request, response);
  }

  if (request.method === HttpMethods.PUT && baseURL === Routes.PODCAST) {
    await updatePodcast(request, response);
  }

  if (request.method === HttpMethods.PATCH && baseURL === Routes.PODCAST) {
    await partialUpdatePodcast(request, response);
  }

  if (request.method === HttpMethods.DELETE && baseURL === Routes.PODCAST) {
    await deletePodcast(request, response);
  }
}
