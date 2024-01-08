const { Router } = require('express');
const connection = require('../database/connection');
const validateName = require('../files/middlewares/validateName');
const validateOffice = require('../files/middlewares/validateOffice');
const validateDepartment = require('../files/middlewares/validateDepartment');
const validateWage = require('../files/middlewares/validadeWage');

const employeesRouter = Router();

employeesRouter.get('/', async (_req, res) => {
    try {
      const [employees] = await connection.execute('SELECT * FROM employees');
      return res.status(200).json(employees);
  } catch (error) {
      console.error('Erro ao obter funcionários:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
  }
  });

employeesRouter.get('/:id', async (req, res) => {
const { id } = req.params;
const [currEmployee] = await connection.execute('SELECT * FROM employees WHERE id = ?', [id]);
if (!currEmployee) {
return res
.status(404).json({ message: 'Employee not found' }); 
}
res.status(200).json(currEmployee);
});

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

module.exports = employeesRouter;