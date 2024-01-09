const { Router } = require('express');
const connection = require('../database/connection');
const validateName = require('../files/middlewares/validateName');
const validateOffice = require('../files/middlewares/validateOffice');
const validateDepartment = require('../files/middlewares/validateDepartment');
const validateWage = require('../files/middlewares/validadeWage');

const employeesRouter = Router();

// Obtendo todos os funcionários

employeesRouter.get('/', async (_req, res) => {
    try {
      const [employees] = await connection.execute('SELECT * FROM employees');
      return res.status(200).json(employees);
  } catch (error) {
      console.error('Erro ao obter funcionários:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
  }
  });

// Filtrando usuário pelo departamento 
  
employeesRouter.get('/funcionarios/search', async (req, res) => {
  const { dep } = req.query;
  try {
  const [employees] = await connection
  .execute('SELECT * FROM employees WHERE departamento = ?', [dep]);
  return res.status(200).json(employees);
  } catch (error) {
    return res.status(200).json([]);
  }
});

// Filtrando usuário pelo id

employeesRouter.get('/:id', async (req, res) => {
const { id } = req.params;
const [currEmployee] = await connection.execute('SELECT * FROM employees WHERE id = ?', [id]);
if (!currEmployee) {
return res
.status(404).json({ message: 'Employee not found' }); 
}
res.status(200).json(currEmployee);
});

 // Adicionando usuário

employeesRouter.post('/funcionarios',
 validateName,
 validateOffice,
 validateDepartment,
 validateWage,
 async (req, res) => {
   try {
    const { nome, cargo, departamento, salario } = req.body;
    const [newEmployee] = await connection
    .execute('INSERT INTO employees (nome, cargo, departamento, salario) VALUES (?, ?, ?, ?)', 
    [nome, cargo, departamento, +salario]);

    return res.status(201).json({ message: 'New employee added!' }, newEmployee);
   } catch (error) {
    return res.status(500).send({ message: error.message });
   }
});

// Alterando usuário

employeesRouter.put('/funcionarios/:id',
validateName,
 validateOffice,
 validateDepartment,
 validateWage,
async (req, res) => {
  try {
 const { id } = req.params;
  const { nome, cargo, departamento, salario } = req.body;
  const [updateCurrEmp] = await connection
  .execute('UPDATE employees SET nome = ?, cargo = ?, departamento = ?, salario = ? WHERE id = ?', 
  [nome, cargo, departamento, +salario, id]);

  return res.status(200).json({ message: 'Employee updated!' }, updateCurrEmp);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Deletando usuário

employeesRouter.delete('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const [currEmployee] = await connection.execute('DELETE FROM employees WHERE id = ?', [id]);
  if (currEmployee === -1) {
    return res.status(404).json({ message: 'Employee not found!' });
  }
  res.status(200).end();
});

module.exports = {
  employeesRouter,
};