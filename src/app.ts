import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import router from './routes/locusRoutes';
import jwt from 'jsonwebtoken';
import { verifyToken, isAdmin, isNormalUser, isLimitedUser } from './middleware/authMiddleware';
import { users } from './models/userModel';
import { userConfig } from './config/user';

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

/**
 * Serve Swagger documentation
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/api', isAdmin, isNormalUser, isLimitedUser, router);
app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Hello World")
});

// Define your routes
app.get('/', (req, res) => {
    res.send('Hello, Express with JWT authentication!');
});

// Public route: User registration
app.post('/register', (req, res) => {
    // Handle user registration here
    // ...
    res.send('User registered successfully');
});

// Public route: User login
app.post('/login', (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }


    if (!secret) return false;

    // Generate a JWT token
    const token = jwt.sign(
        { sub: user.username, username: user.username, role: user.role },
        secret,
        { expiresIn: '1h' }
    );
    console.log(user, secret);

    res.json({ token });
});

// Protected route: Admin can access
app.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Admin route accessed' });
});

// Protected route: Normal user can access
app.get('/normal', verifyToken, isNormalUser, (req, res) => {
    res.json({ message: 'Normal user route accessed' });
});

// Protected route: Limited user can access
app.get('/limited', verifyToken, isLimitedUser, (req, res) => {
    res.json({ message: 'Limited user route accessed' });
});

/**
 * Express Application Expose Port
 */
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);

});

export default app;