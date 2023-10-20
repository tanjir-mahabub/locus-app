import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  it('responds with "Hello World" at the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
