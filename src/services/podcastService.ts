import { PodcastModel } from '../models/PodcastModelDTO';
import { ResponsePodcastModelDTO } from '../models/ResponsePodcastModelDTO';
import {
  getAllPodcastsRepository,
  createPodcastRepository,
  updatePodcastByIDRepository,
  partialUpdatePodcastRepository,
  deletePodcastRepository,
} from '../repositories/podcastRepository';
import { httpStatusCode } from '../utils/httpStatusCode';

export const getAllEpisodesService =
  async (): Promise<ResponsePodcastModelDTO> => {
    const data = await getAllPodcastsRepository();

    return {
      statusCode:
        data.length > 0 ? httpStatusCode.OK : httpStatusCode.NO_CONTENT,
      body: data,
    };
  };
export const getFilteredPodcastsService = async (
  param: string,
): Promise<ResponsePodcastModelDTO> => {
  const data = await getAllPodcastsRepository(param);

  return {
    statusCode: data.length > 0 ? httpStatusCode.OK : httpStatusCode.NO_CONTENT,
    body: data,
  };
};
export const createPodcastService = async (
  newPodcast: PodcastModel,
): Promise<ResponsePodcastModelDTO> => {
  const createdPodcast = await createPodcastRepository(newPodcast);

  return {
    statusCode: httpStatusCode.CREATED,
    body: [createdPodcast],
  };
};
export const updatePodcastService = async (
  id: string,
  updatedPodcast: PodcastModel,
): Promise<ResponsePodcastModelDTO> => {
  const updated = await updatePodcastByIDRepository(id, updatedPodcast);

  if (!updated) {
    return {
      statusCode: httpStatusCode.NOT_FOUND,
      body: [],
    };
  }

  return {
    statusCode: httpStatusCode.OK,
    body: [updated],
  };
};
export const partialUpdatePodcastService = async (
  id: string,
  partialData: Partial<PodcastModel>,
): Promise<ResponsePodcastModelDTO> => {
  const updated = await partialUpdatePodcastRepository(id, partialData);

  if (!updated) {
    return {
      statusCode: httpStatusCode.NOT_FOUND,
      body: [],
    };
  }

  return {
    statusCode: httpStatusCode.OK,
    body: [updated],
  };
};

export const deletePodcastService = async (
  id: string,
): Promise<ResponsePodcastModelDTO> => {
  const success = await deletePodcastRepository(id);

  if (!success) {
    return {
      statusCode: httpStatusCode.NOT_FOUND,
      body: [],
    };
  }

  return {
    statusCode: httpStatusCode.NO_CONTENT,
    body: [],
  };
};
