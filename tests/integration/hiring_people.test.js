/* eslint-disable max-lines-per-function */
const chai = require('chai');
const sinon = require('sinon');
const fs = require('fs');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const employeesJson = require('../../src/files/employees.json');
const mockAllEmployees = require('../../src/files/mockFilePeole.json');

const mockFileGET = JSON.stringify(employeesJson);
const mockFilePOST = JSON.stringify(mockAllEmployees);

chai.use(chaiHttp);

describe('TESTANDO A API - REQUISIÇÃO GET', () => {
    beforeEach(() => {
        sinon.stub(fs.promises, 'readFile')
    .resolves(mockFileGET);
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
            expect(response.body.currEmployee).to.deep
            .include({
               id: 5,
            });
        });
        it('Ao passar um id inválido, uma mensagem de erro é retornada', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/345');
            expect(response.status).to.be.equal(404);
            expect(response.body).to.deep
            .equal({ message: 'Employee not found' });
        });
    });

    describe('Usando o método GET em /funcionarios/search para o departamento', () => {
        it('Com o parâmetro "search?dep=ti", retorna todos os funcionários de TI', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search?dep=ti');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.length(3);
            expect(response.body[0]).to.deep
            .include({
                departamento: 'TI',
            });
        });
        it('Ao passar nenhum parâmetro, retorna todos os funcionários da empresa', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.deep
            .equal(mockAllEmployees);
        });
        it('Ao passar um parâmetro inválido, o endpoint retorna um array vazio', async () => {
            const response = await chai.request(app)
            .get('/funcionarios/search?dep=invalidParameter');
            expect(response.status).to.be.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
});

describe('TESTANDO A API - REQUISIÇÃO POST', () => {
    beforeEach(() => {
        sinon.stub(fs.promises, 'readFile')
    .resolves(mockFilePOST);
    });
    
    afterEach(() => {
        sinon.restore();
    });
    describe('Utilizando o método POST em /login', () => {
        it('Ao passar dados válidos, é retornado um token ao usuário', async () => {
            const response = await chai.request(app)
            .post('/login')
            .send({ email: 'avnerhdpb@gmail.com', pass: '123456' });
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have
            .property('token');
        });
        it('Ao passar um email inválido, o usuário é orientado sobre o erro', async () => {
            const response = await chai.request(app)
            .post('/login')
            .send({ email: 'avnerhdpb.com', pass: '123456' });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.deep
            .equal({ mesage: 'O campo e-mail deve ser preenchido corretamente!' });
        });
        it('Ao não passar nenhum e-mail, uma mensagem de erro é retornada', async () => {
            const response = await chai.request(app)
            .post('/login')
            .send({ pass: '123456' });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.deep.equal({ message: 'O campo e-mail é obrigatório' });
        });
        it('Ao passar uma senha inválida, o usuário é orientado sobre o erro', async () => {
            const response = await chai.request(app)
            .post('/login')
            .send({ email: 'avnerhdpb@gmail.com', pass: '56' });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.deep
            .equal({ message: 'O campo password deve conter pelo menos 6 caracteres' });
        });
        it('Ao não passar nenhuma senha, uma mensagem de erro é retornada', async () => {
            const response = await chai.request(app)
            .post('/login')
            .send({ email: 'avnerhdpb@gmail.com' });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.deep
            .equal({ message: 'O campo password é obrigatório' });
        });
    });
});