# Hiring_People
## README - EM CONSTRUÇÃO
As orientações a seguir são para o projeto em si.

Repositório para a criação de um sistema CRUD, utilizando tecnologias como Node.js e Express, para o cadastro de novas pessoas que podem ser contratadas por uma empresa fictícia.

## Configuração do Projeto:
- [x] Inicie um novo projeto Node.js.
- [x] Instale o Express para gerenciar rotas.
- [x] Instale o Nodemon para facilitar o desenvolvimento.

## Criação de Rotas:
- [x] Defina rotas para as operações CRUD, como `GET /candidates`, `GET /candidates/:id`, `POST /candidates`, `PUT /candidates/:id`, e `DELETE /candidates/:id`.

## Simulação de Dados:
- [x] Crie uma estrutura de dados simples no próprio código (sem um banco de dados) para simular candidatos e empresas.
- [x] Armazene esses dados em arrays ou objetos no arquivo do servidor.

## Middleware de Autenticação Simples:
- [ ] Adicione um middleware para simular a autenticação básica.
- [ ] Pode ser algo tão simples quanto verificar a presença de um token fictício nos cabeçalhos da solicitação.

## Implementação do CRUD:
- [x] Desenvolva a lógica para as operações CRUD dentro das rotas.
- [x] Por exemplo, ao receber uma solicitação para criar um novo candidato (POST /candidates), adicione o novo candidato à sua estrutura de dados.

## Validações:
- [ ] Adicione verificações básicas de validação nos dados recebidos nas solicitações (por exemplo, se os campos obrigatórios estão presentes).

## Teste de Rotas:
- [x] Realize testes nas rotas para garantir que estão funcionando conforme esperado.

## Middleware de Erros:
- [ ] Implemente um middleware de tratamento de erros para lidar com solicitações inválidas ou erros internos.

## Documentação da API:
- [ ] Considere adicionar documentação básica para suas rotas, indicando os parâmetros esperados e os formatos de resposta.
