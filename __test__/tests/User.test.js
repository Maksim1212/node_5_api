const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const { expect } = chai;

describe('UserComponent -> controller', () => {
    describe('UserComponent -> controller -> /v1/createUser', () => {
        it('loginUserPost', (done) => {
            request(server)
                .post('/v1/auth/login')
                .set('Accept', 'application/json')
                .redirects(1)
                .expect('Content-Type', /html/)
                .expect(403, done());
        });
        it('UsersAll', (done) => {
            request(server)
                .get('/v1/users/')
                .redirects(1)
                .expect(200)
                .then(({ res }) => {
                    expect(res.text).to.include('401');
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
