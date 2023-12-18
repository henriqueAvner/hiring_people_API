const express = require('express');
const { readEmployees, findEmployee } = require('./middlewares/functions');

const app = express();

app.get('/', (_req, res) => res
.status(200)
.json({ message: 'CRUD employees! Type /funcionarios to bring all employees!' }));

app.get('/funcionarios', async (_req, res) => {
    try {
      const allEmployees = await readEmployees();
      return res.status(200).json(allEmployees);
    } catch (error) {
      return res.status(404).send(error.message);  
    }
});

app.get('/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    const currEmployee = await findEmployee(Number(id));
    if (!currEmployee) {
 return res
    .status(404).json({ message: 'Employee not found' }); 
}
    res.status(200).json({ currEmployee });
});

module.exports = app;