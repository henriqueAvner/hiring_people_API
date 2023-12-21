const chai = require('chai');
const sinon = require('sinon');
const fs = require('fs');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const employeesJson = require('../../src/files/employees.json');
const mockAllEmployees = require('../mockFilePeole.json');

const mockFile = JSON.stringify(employeesJson);

chai.use(chaiHttp);

// eslint-disable-next-line max-lines-per-function
describe('testando a API hiring_people', () => {
    beforeEach(() => {
        sinon.stub(fs.promises, 'readFile')
    .resolves(mockFile);
    });
    
    afterEach(() => {
        sinon.restore();
    });
    describe('Usando o método GET em /funcionarios', () => {
        it('Retorna todos os funcionários da API', async () => {
            const response = await chai
            .request(app)
            .get('/funcionarios');
            expect(response.status).to.be.equals(200);
            expect(response.body.employees).to.deep.equal(mockAllEmployees);
        });
    });
    describe('Usando  método GET em /funcionarios/:id', () => {
        it('Retorna o funcionário de número 5 ao passar o id 5', async () => {
            const response = await chai
            .request(app)
            .get('/funcionarios/5');
            expect(response.status).to.be.equal(200);
            expect(response.body.currEmployee).to.deep.equal(mockAllEmployees[4]);
            expect(response.body.currEmployee).to.deep.include({
               id: 5,
            });
        });
        it('Ao passar um id inválido, uma mensagem de erro é retornada', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/345');
            expect(response.status).to.be.equal(404);
            expect(response.body).to.deep.equal({ message: 'Employee not found' });
        });
    });
    // eslint-disable-next-line max-lines-per-function
    describe('Usando o método GET em /funcionarios/search para o departamento', () => {
        it('Com o parâmetro "search?dep=ti", retorna todos os funcionários de TI', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search?dep=ti');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.length(3);
            expect(response.body[0]).to.deep.include({
                departamento: 'TI',
            });
        });
        it('Ao passar nenhum parâmetro, retorna todos os funcionários da empresa', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.deep.equal(mockAllEmployees);
        });
        it('Ao passar um parâmetro inválido, o endpoint retorna um array vazio', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search?dep=invalidParameter');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
});