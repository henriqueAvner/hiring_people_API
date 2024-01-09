const express = require('express');

const validadeLogin = require('./files/middlewares/validadeLogin');
const validatePass = require('./files/middlewares/validatePass');
const generateToken = require('./helpers/utils/generateToken');

const routers = require('./routes');

const app = express();
app.use((express.json()));

app.use('/funcionarios', routers);

app.use('/funcionarios/search', routers);

app.use('/funcionarios/:id', routers);

app.post('/login', validadeLogin, validatePass, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = app;