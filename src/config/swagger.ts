import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger Initialize
 */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Locus API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
    },
    apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
