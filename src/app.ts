import * as http from 'http';
import { routeManager } from './routeManager';

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  try {
    await routeManager(request, response);
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    response.statusCode = 500;
    response.end('Erro interno no servidor');
  }
};
