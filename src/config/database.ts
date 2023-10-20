import pgPromise from 'pg-promise';

type DBConnectionType = () => any;

/**
 * pg-promise instance
 */
const pgp = pgPromise();

/**
 * Database Connection Initialize
 * 
 * @returns any
 */
export const DBConnection: DBConnectionType = async () => {

    const DB_STRING = process.env.DB_CONNECTION_STRING;

    if (!DB_STRING) return false;

    // DB string connection
    const db = pgp(DB_STRING);

    return db;
}

