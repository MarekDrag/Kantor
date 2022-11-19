import getenv from 'getenv';
import knexStringcase from 'knex-stringcase';

const options = {
  client: 'pg',
  connection: 'postgres://admin:secret@postgres:5432/dev',
  migrations: {
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};

const postgresConfig = knexStringcase(options);

export default postgresConfig;
