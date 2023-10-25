import { DataSource } from 'typeorm';

describe('Database Connection', () => {

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

    it('should connect to the database successfully', async () => {

        if (DB_CONNECTION_STRING) {
            const dataSource = new DataSource({
                type: 'postgres',
                url: DB_CONNECTION_STRING,
                entities: ['src/entities/*.ts'],
                synchronize: false,
                logging: false
            });

            await dataSource.connect();

            expect(dataSource.isConnected).toBe(true);
        }

    });

});