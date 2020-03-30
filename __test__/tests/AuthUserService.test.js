const chai = require('chai');
const UtilService = require('../../src/components/Auth/service');

const { expect } = chai;

const newUser = {
    email: 'chaiTestUser@gmail.com',
    password: '123456',
};
let newUserId = '';

describe('AuthUserComponent -> service', () => {
    it('AuthUserComponent -> service -> create', (done) => {
        UtilService.createUser(newUser)
            .then((res) => {
                newUserId = res['_id'];
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('AuthUserComponent -> service -> findUser', (done) => {
        UtilService.findUser(newUser.email)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('AuthUserComponent -> service -> deleteUserByID', (done) => {
        UtilService.deleteUserById(newUserId)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'ok', 'deletedCount');
                done();
            })
            .catch(done);
    });
});
