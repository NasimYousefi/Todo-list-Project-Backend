// import { POSTGRES_SECRETS } from '../secrets/index.js';
// import pg from 'pg';

// const { Client } = pg;
// const client = new Client(POSTGRES_SECRETS);

// // Connect to the client when the file is imported
// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Error connecting to PostgreSQL', err));


// export async function query(sql, variables) {
//   try {
//     const res = await client.query(sql, variables);
//     return res;
//   } catch (err) {
//     console.error('Error executing query', err);
//     throw err;
//   }
// }

// export const closeConnection = () => {
//   client.end();
// };


import { POSTGRES_SECRETS } from '../secrets/index.js';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool(POSTGRES_SECRETS);

// Test the pool when the file is imported
pool.query('SELECT NOW()')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

export async function query(sql, variables) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, variables);
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  } finally {
    client.release();
  }
}

export const closeConnection = () => {
  return pool.end();
};

// Optional: Error handling for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});