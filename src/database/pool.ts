import { Pool } from 'pg';
import { clientConfig } from '../models/DBClientConfig';

const pool = new Pool(clientConfig);

export default pool;
