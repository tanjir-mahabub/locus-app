import swaggerJsdoc from 'swagger-jsdoc';
import swaggerSpec from '../../src/config/swagger';

jest.mock('swagger-jsdoc', () => jest.fn());

describe('Swagger Configuration', () => {
    it('should call swaggerJsdoc with the correct options', () => {
        const mockSwaggerJsdoc = swaggerJsdoc as jest.Mock;

        expect(mockSwaggerJsdoc).toHaveBeenCalledWith({
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'Locus API with Swagger',
                    version: '1.0.0',
                    description: 'Documentation for Express API with Swagger',
                },
            },
            apis: ['./src/routes/*.ts'],
        });
    });

    it('should export the Swagger spec', () => {
        expect(swaggerSpec).toBe(swaggerJsdoc());
    });
});
