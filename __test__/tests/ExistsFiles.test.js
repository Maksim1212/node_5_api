const chai = require('chai');
const path = require('path');

chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
    it('CodeStyle', (done) => {
        expect(path.join(__dirname, '../../.eslintrc.json')).to.be.a.path();

        done();
    });
    it('Editorconfig', (done) => {
        expect(path.join(__dirname, '../../.editorconfig')).to.be.a.path();

        done();
    });
    it('ENV', (done) => {
        expect(path.join(__dirname, '../../.env')).to.be.a.path();

        done();
    });
    it('Gitignore', (done) => {
        expect(path.join(__dirname, '../../.gitignore')).to.be.a.path();

        done();
    });
    it('Nodemon', (done) => {
        expect(path.join(__dirname, '../../nodemon.json')).to.be.a.path();

        done();
    });
    it('Package json', (done) => {
        expect(path.join(__dirname, '../../package.json')).to.be.a.path();

        done();
    });
    it('Readme', (done) => {
        expect(path.join(__dirname, '../../README.MD')).to.be.a.path();

        done();
    });
});
