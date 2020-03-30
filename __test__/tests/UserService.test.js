const chai = require('chai');
const UtilService = require('../../src/components/User/service');


const { expect } = chai;

const fullName = 'New Name';
const newUser = {
    email: 'chaiTestUser@gmail.com',
    fullName: 'Chai Test',
};
let newUserId = '';

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> positive -> create', (done) => {
        UtilService.create(newUser)
            .then((res) => {
                newUserId = res['_id'];
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> positive -> findAll', (done) => {
        UtilService.findAll()
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('array');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> positive -> findById', (done) => {
        UtilService.findById(newUserId)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> positive  -> updateById', (done) => {
        UtilService.updateById(newUserId, { fullName })
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'nModified', 'ok');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> positive -> deleteById', (done) => {
        UtilService.deleteById(newUserId)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'ok', 'deletedCount');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> negative -> findByWrongId', (done) => {
        UtilService.findById('5e74584a2f5629044b4520c6')
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('null');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> negative -> updateByWrongId', (done) => {
        UtilService.updateById('5e74584a2f5629044b4520c6', { fullName })
            .then((res) => {
                expect(res.error === 'CastError');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> negative -> deleteByWrongId', (done) => {
        UtilService.deleteById('5e74584a2f5629044b4520c6')
            .then((res) => {
                expect(res.error === 'CastError');
                done();
            })
            .catch(done);
    });
});
