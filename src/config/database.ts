import * as pgPromise from 'pg-promise';

// Create a new instance of the pg-promise library
const pgp = pgPromise();

// Set up a database connection
const db = pgp('your-database-connection-string-here');

export default db;
