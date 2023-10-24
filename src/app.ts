import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import router from './routes/locusRoutes';
import jwt from 'jsonwebtoken';
import { users } from './models/userModel';
import path from 'path';
import AppDataSource from './config/typeORM';
import "reflect-metadata"

/**
 * Environment Variable Initialize
 */
dotenv.config();
let port = process.env.APP_PORT || 3000;
const secret = process.env.JWT_SECRET;

/**
 * Express App Initialize
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'views')));

/**
 * Serve Swagger documentation
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

/**
 * Protected Login Route
 */
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    /**
     * Check the user
     */
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    /**
     * Check the password
     */
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!secret) return false;

    /**
     * Generate JWT Token
     */
    const token = jwt.sign(
        { sub: user.username, username: user.username, role: user.role },
        secret,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

/**
 * Database Initialization
 */
AppDataSource.initialize()
    .then(() => console.log('🌐 Database Connected Successfully'))
    .catch((err) => console.log('⛔ Database connection error'));

/**
 * Express Application Expose Port
 */
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);

});

export default app;