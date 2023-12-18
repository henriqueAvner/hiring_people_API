const express = require('express');
const { readEmployees, findEmployee, addEmployee } = require('./middlewares/functions');

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

module.exports = app;