import { Client } from 'pg';
import { clientConfig } from '../models/DBClientConfig';

const client = new Client(clientConfig);

export const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      video_id VARCHAR(255) UNIQUE NOT NULL,
      podcast_name VARCHAR(255) NOT NULL,
      episode VARCHAR(255) NOT NULL,
      categories TEXT[],
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createTriggerFunctionQuery = `
    CREATE OR REPLACE FUNCTION update_podcast_updated_at() 
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  const createTriggerQuery = `
    CREATE TRIGGER update_podcast_before_update
    BEFORE UPDATE ON podcasts
    FOR EACH ROW
    EXECUTE FUNCTION update_podcast_updated_at();
  `;

  try {
    await client.connect();
    console.log('Conectado ao banco de dados.');
    await client.query(createTableQuery);
    console.log('Tabela criada com sucesso!');
    await client.query(createTriggerFunctionQuery);
    console.log('Função do trigger criada com sucesso!');
    await client.query(createTriggerQuery);
    console.log('Trigger criado com sucesso!');
  } catch (err) {
    console.error('Erro ao criar a tabela ou trigger:', err);
  } finally {
    await client.end();
    console.log('Conexão com o banco de dados encerrada.');
  }
};
