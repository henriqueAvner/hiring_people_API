const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const employeesJson = require('../mockFilePeole.json');

chai.use(chaiHttp);

describe('testando a API hiring_people', () => {
    describe('Usando o método GET em /funcionarios', () => {
        it('Retorna todos os funcionários da API', async () => {
            const response = await chai
            .request(app)
            .get('/funcionarios');
            expect(response.status).to.be.equals(200);
            expect(response.body.employees).to.deep.equal(employeesJson);
        });
    });
});