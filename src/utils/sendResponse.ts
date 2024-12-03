import { ServerResponse } from 'http';
import { ContentType } from '../utils/contentType';

export const sendResponse = <T>(
  res: ServerResponse,
  statusCode: number,
  body?: T,
): void => {
  res.writeHead(statusCode, { 'content-type': ContentType.JSON });
  if (body) {
    res.write(JSON.stringify(body));
  }
  res.end();
};
