import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();
let port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);

});

export default app;