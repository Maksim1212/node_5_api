const request = require('supertest');

const server = require('../../src/server/server');

describe('AuthUserComponent -> controller', () => {
    it('Login page', (done) => {
        request(server)
            .get('/v1/auth/login')
            .expect(200, done);
    });
    it('Register page', (done) => {
        request(server)
            .get('/v1/auth/register')
            .expect(200, done);
    });
    it('Page 401', (done) => {
        request(server)
            .get('/v1/auth/401')
            .expect(200, done);
    });
    it('Page 403', (done) => {
        request(server)
            .get('/v1/auth/403')
            .expect(200, done);
    });
});
