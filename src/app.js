const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const { readEmployees, findEmployee, addEmployee } = require('./middlewares/functions');

const employeesPath = path.resolve(__dirname, './files/employees.json');

const app = express();
app.use((express.json()));

app.get('/', (_req, res) => res
.status(200)
.json({ message: 'CRUD employees!! Type /funcionarios to bring all employees!' }));

// Retorna todos os funcionários da empresa:

app.get('/funcionarios', async (_req, res) => {
    try {
      const allEmployees = await readEmployees();
      return res.status(200).json({ employees: allEmployees });
    } catch (error) {
      return res.status(404).send(error.message);  
    }
});

// Retorna todos os funcionários baseados em seu departamento:

app.get('/funcionarios/search', async (req, res) => {
  const { dep } = req.query;
  const allEmployees = await readEmployees();
  if (!dep) {
    return res.status(200).json(allEmployees);
  }
  const filterEmployees = allEmployees
  .filter(({ departamento }) => departamento
  .toLowerCase() === (dep.toLowerCase()));

  if (filterEmployees.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(filterEmployees);
});

// Retorna o funcionário da empresa pelo ID:

app.get('/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const currEmployee = await findEmployee(Number(id));
    if (!currEmployee) {
 return res
    .status(404).json({ message: 'Employee not found' }); 
}
    res.status(200).json(currEmployee);
});

// Adiciona um novo funcionário a empresa:

app.post('/funcionarios', async (req, res) => {
   try {
    const { nome, cargo, departamento, salario } = req.body;
    await addEmployee(nome, cargo, departamento, salario);
    return res.status(201).json({ message: 'Employee added!' });
   } catch (error) {
    return res.status(500).send({ message: error.message });
   }
});

// Editando um funcionário da empresa:

app.put('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cargo, departamento, salario } = req.body;
  const allEmployees = await readEmployees();
  const updateCurrEmp = allEmployees.find((employee) => employee.id === +id);
  if (!updateCurrEmp) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  updateCurrEmp.nome = nome;
  updateCurrEmp.cargo = cargo;
  updateCurrEmp.departamento = departamento;
  updateCurrEmp.salario = salario;
  const newEmployee = JSON.stringify(allEmployees);
  await fs.writeFile(employeesPath, newEmployee);
  return res.status(200).json(updateCurrEmp);
});

// Deletando um funcionário através de seu index: 

app.delete('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const allEmployees = await readEmployees();
  const currEmployee = allEmployees.findIndex((employee) => employee.id === +id);
  if (currEmployee === -1) {
    return res.status(404).json({ message: 'Employee not found!' });
  }
  allEmployees.splice(currEmployee, 1);
  const newEmployees = JSON.stringify(allEmployees);
  await fs.writeFile(employeesPath, newEmployees);
  res.status(200).end();
});

module.exports = app;