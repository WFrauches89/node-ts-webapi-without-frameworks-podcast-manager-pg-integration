import { ClientConfig } from 'pg';

if (!process.env.USER || !process.env.POSTGRES_DB || !process.env.PASSWORD) {
  throw new Error('Variáveis de ambiente necessárias não estão definidas');
}

export interface DBClientConfig extends ClientConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export const clientConfig: DBClientConfig = {
  user: process.env.USER as string,
  host: 'localhost',
  database: process.env.POSTGRES_DB as string,
  password: process.env.PASSWORD as string,
  port: parseInt(process.env.PORTPG || '5432', 10),
};
