import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';

describe('User API', () => {
    describe('POST /user', () => {
        it('should create a new user', async () => {
            const createdUser = {
                id: 1,
                email: 'admin@mail.com',
                password: 'truepassword',
            };

            prismaMock.user.create.mockResolvedValue(createdUser);

            const response = await request(app)
                .post('/user')
                .send({ password: 'truepassword' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdUser);
        });
    });

    describe('POST /login', () => {
        it('should login a user and return a token', async () => {
            const user = {
                id: 1,
                email: 'admin@mail.com',
                password: 'truepassword',
            };
            const token = 'mockedToken';

            prismaMock.user.findUnique.mockResolvedValue(user);

            const response = await request(app)
                .post('/user/login')
                .send({ email: 'admin@mail.com', password: 'truePassword' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                token,
            });
        });
    });
});
