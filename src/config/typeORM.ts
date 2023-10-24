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

export default AppDataSource;