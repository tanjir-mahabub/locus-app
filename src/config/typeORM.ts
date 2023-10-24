import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Database Connection Parameters
 */
const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_CONNECTION_STRING,
    entities: ["src/entities/*.ts"],
    synchronize: false,
    logging: false
});

/**
 * Database Initialization
 */
AppDataSource.initialize()
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.log('Database connected error'));

export default AppDataSource;