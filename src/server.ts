import * as http from 'http';
import { app } from './app';
import { createTable } from './database/client';

const server = http.createServer(app);

const log = console.log;
const port: string | undefined = process.env.PORT;

server.listen(port, async () => {
  log(`Conexão estabelecida, rodando na porta ${port}!`);
  await createTable();
});
