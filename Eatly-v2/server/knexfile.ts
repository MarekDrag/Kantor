import type { Knex } from 'knex';
import postgresConfig from './src/db/postgresConfig';


const config: { [key: string]: Knex.Config } = {
  development: postgresConfig,
};

export default config;
