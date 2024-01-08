USE db_employees;

CREATE TABLE
    employees (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(30) NOT NULL,
        cargo VARCHAR(30) NOT NULL,
        departamento VARCHAR(30) NOT NULL,
        salario INT NOT NULL,
    );

INSERT INTO
    employees (
        nome,
        cargo,
        departamento,
        salario
    )
VALUES (
        'Carlos Santos',
        'Analista Financeiro',
        'Finanças',
        4800
    ), (
        'Ana Souza',
        'Designer Gráfico',
        'Marketing',
        4200
    ), (
        'Rafael Lima',
        'Gerente de Projetos',
        'TI',
        6000
    ), (
        'Fernanda Pereira',
        'Analista de Qualidade',
        'Qualidade',
        4700
    ), (
        'Pedro Costa',
        'Analista de Marketing',
        'Marketing',
        4400
    ), (
        'Lúcia Santos',
        'Analista de Sistemas',
        'TI',
        5200
    ), (
        'Gustavo Oliveira',
        'Analista de Vendas',
        'Vendas',
        4800
    ), (
        'Camila Rocha',
        'Gerente Administrativo',
        'Administração',
        7500
    ), (
        'Avner Henrique',
        'Desenvolvedor',
        'TI',
        4000
    );