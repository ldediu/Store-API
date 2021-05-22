import supertest from 'supertest';
import app from '../../../src/server';

const request = supertest(app);
let token = '';

describe("Users Handler Testing", () => {
    it('index method should not return a list of users without a token', async () => {
      const response = await request.get('/users');
      expect (response.status).toBe(401);
    });

    it('should create a user', async () => {
        const new_user = {
            first_name: "John",
            last_name: "Doe",
            password: "123"
        }
        const response = await request.post('/users').send(new_user);
        token = response.body.token;
        expect (response.status).toBe(200);
    });

    it('index method should return a list of users', async () => {
        const response = await request.get('/users').set("Authorization", `Bearer ${token}`);
        expect (response.status).toBe(200);
    });

    it('show method should return a user', async () => {
        const response = await request.get('/users').send('1').set("Authorization", `Bearer ${token}`);
        expect (response.status).toBe(200);
    });

    it('show method should not return a user with a wrong token', async () => {
        const response = await request.get('/users').send('1').set("Authorization", `Bearer ${token}1`);
        expect (response.status).toBe(401);
    });
});