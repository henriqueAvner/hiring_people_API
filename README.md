<h1>#Hiring_People</h1>
<h2>READ.ME - EM CONSTRUÇÃO -> As orientações a seguir são para
    o projeto em si.
</h2>
<p>
    Repositório para a criação de um sistema CRUD, com tecnologias como Node.js e
    Express
    para o cadastro de novas
    pessoas que podem ser contratadas por uma empresa fictícia.
</p>

<h2>Configuração do Projeto:</h2>

<h4>
    Inicie um novo projeto Node.js.
    Instale o Express para gerenciar rotas e o Nodemon para facilitar o desenvolvimento.
</h4>

<h2>Criação de Rotas:</h2>

<h4>
    Defina rotas para as operações CRUD, como GET /candidates, GET /candidates/:id, POST /candidates, PUT
    /candidates/:id, e
    DELETE /candidates/:id.
    Faça o mesmo para as operações relacionadas a empresas.
</h4>

<h2>Simulação de Dados:</h2>

<h4>
    Crie uma estrutura de dados simples no próprio código (sem um banco de dados) para simular candidatos e empresas.
    Armazene esses dados em arrays ou objetos no arquivo do servidor.
</h4>

<h2>Middleware de Autenticação Simples:</h2>

<h4>Adicione um middleware para simular a autenticação básica.
    Pode ser algo tão simples quanto verificar a presença de um token fictício nos cabeçalhos da solicitação.
</h4>

<h2>Implementação do CRUD:</h2>

<h4>Desenvolva a lógica para as operações CRUD dentro das rotas.
    Por exemplo, ao receber uma solicitação para criar um novo candidato (POST /candidates), adicione o novo candidato à
    sua
    estrutura de dados simulada.
</h4>

<h2>Validações:</h2>

<h4>Adicione verificações básicas de validação nos dados recebidos nas solicitações (por exemplo, se os campos
    obrigatórios
    estão presentes).
</h4>

<h2>Teste de Rotas:</h2>

<h4>Use ferramentas como Postman ou Insomnia para testar suas rotas manualmente.
    Certifique-se de que cada operação CRUD está funcionando conforme o esperado.
</h4>
</h2>
<h2>Middleware de Erros:</h2>

<h4>Implemente um middleware de tratamento de erros para lidar com solicitações inválidas ou erros internos.

</h4>

<h2>Documentação da API:</h2>

<h4>Considere adicionar documentação básica para suas rotas, indicando os parâmetros esperados e os formatos de
    resposta.
</h4>

<h2>Simulação de Respostas Assíncronas:</h2>

<h4>Introduza atrasos artificiais nas respostas para simular operações assíncronas (usando setTimeout, por exemplo).
</h4>