import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger Initialize
 */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Locus Data API',
            description: '',
            version: '1.0.0',
            contact: {
                email: 'md.tanjir.mahabub@gmail.com'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.ts'],
};

/**
 * Swagger Definition Instance
 */
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
