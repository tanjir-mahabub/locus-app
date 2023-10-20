import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { DBConnection } from './config/database';
import router from './routes/locusRoutes';

/**
 * Environment Variable Initialize
 */
dotenv.config();
let port = process.env.APP_PORT || 3000;

/**
 * Express App Initialize
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Serve Swagger documentation
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Hello World")
});

/**
 * Express Application Expose Port
 */
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);

});

export default app;