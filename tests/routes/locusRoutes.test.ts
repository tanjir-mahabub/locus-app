import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import express from 'express';
import locusRoutes from '../../src/routes/locusRoutes';

dotenv.config({ path: '.env' });

const app = express();
app.use('/api', locusRoutes);

describe('Locus Route Tests', () => {
    it('should return the expected data from the /api/locus endpoint', async () => {
        const response = await request(app).get('/api/locus');

        expect(response.status).toBe(403);

    });

    it('should return the expected data from the /api/locus endpoint', async () => {

        const JWT_SECRET = await process.env.JWT_SECRET
        const USER = await process.env.USER
        // Create a mock JWT token for testing
        if (JWT_SECRET) {
            const token = await jwt.sign({ sub: USER, username: USER, role: USER }, JWT_SECRET, { expiresIn: '1h' });
            const response = await request(app)
                .get('/api/locus')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
        }
        // Check the response body to match your expectations
    }, 10000);
});
