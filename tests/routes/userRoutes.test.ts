import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import userRoutes from '../../src/routes/userRouters';

const app = express();
app.use(express.json())
app.use('/', userRoutes);

describe('POST /login', () => {

    const JWT_SECRET = process.env.JWT_SECRET;

    it('should return a valid JWT token for a valid login request', async () => {

        if (JWT_SECRET) {
            const user = {
                body: {
                    username: 'admin',
                    password: 'admin_password'
                }
            };

            const response = await request(app)
                .post('/login')
                .send(user)


            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');

            // Verify the JWT token
            const decodedToken = jwt.verify(response.body.token, JWT_SECRET);
            expect(decodedToken.sub).toBe('admin');
        }

    });

    it('should return a 401 status for incorrect user credentials', async () => {
        const user = {
            body: {
                username: 'incorrect',
                password: 'incorrect_password'
            }
        };

        const response = await request(app)
            .post('/login')
            .send(user)

        expect(response.statusCode).toBe(401);
    });

});