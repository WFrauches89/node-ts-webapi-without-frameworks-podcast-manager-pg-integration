import { IncomingMessage, ServerResponse } from 'http';
import {
  getAllEpisodesService,
  getFilteredPodcastsService,
  createPodcastService,
  updatePodcastService,
  partialUpdatePodcastService,
  deletePodcastService,
} from '../services/podcastService';
import { ContentType } from '../utils/contentType';
import { ResponsePodcastModelDTO } from '../models/ResponsePodcastModelDTO';
import { httpStatusCode } from '../utils/httpStatusCode';

const sendResponse = (res: ServerResponse, statusCode: number, body: any) => {
  res.writeHead(statusCode, { 'content-type': ContentType.JSON });
  res.write(JSON.stringify(body));
  res.end();
};

const sendError = (
  res: ServerResponse,
  message: string,
  statusCode: number = httpStatusCode.INTERNAL_SERVER_ERROR,
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ error: message }));
  res.end();
};

export const getAllEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const dataContent = await getAllEpisodesService();
    sendResponse(res, dataContent.statusCode, dataContent.body);
  } catch (error) {
    sendError(res, 'Failed to fetch episodes');
  }
};
export const getFilterPodcasts = async (
  req: IncomingMessage,
  res: ServerResponse,
  paramQueryString: string,
) => {
  try {
    const dataContent: ResponsePodcastModelDTO =
      await getFilteredPodcastsService(paramQueryString);
    sendResponse(res, dataContent.statusCode, dataContent.body);
  } catch (error) {
    sendError(res, 'Failed to fetch filtered podcasts');
  }
};
export const createPodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const data = await createPodcastService(JSON.parse(body));
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Cannot insert podcast: videoId already exists'
      ) {
        sendError(res, error.message, httpStatusCode.BAD_REQUEST);
      } else {
        sendError(
          res,
          'Invalid JSON format for creating podcast',
          httpStatusCode.BAD_REQUEST,
        );
      }
    }
  });
};
export const updatePodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const { id, ...updatedPodcast } = JSON.parse(body);
      if (!id) {
        sendError(res, 'id is required');
        return;
      }
      const data = await updatePodcastService(id, updatedPodcast);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, 'Invalid JSON format for updating podcast');
    }
  });
};
export const partialUpdatePodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { id, ...partialData } = JSON.parse(body);

      if (!id) {
        sendError(res, 'id is required');
        return;
      }

      const data = await partialUpdatePodcastService(id, partialData);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, 'Invalid JSON format for partial update of podcast');
    }
  });
};
export const deletePodcast = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { id } = JSON.parse(body);

      if (!id) {
        sendError(res, 'id is required');
        return;
      }

      const data = await deletePodcastService(id);
      sendResponse(res, data.statusCode, data.body);
    } catch (error) {
      sendError(res, 'Invalid JSON body for deleting podcast');
    }
  });
};
