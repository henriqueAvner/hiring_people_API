const express = require('express');

const router = express.Router();

const validadeLogin = require('../files/middlewares/validadeLogin');
const validatePass = require('../files/middlewares/validatePass');
const validateName = require('../files/middlewares/validateName');
const validateOffice = require('../files/middlewares/validateOffice');
const validateDepartment = require('../files/middlewares/validateDepartment');
const validateWage = require('../files/middlewares/validadeWage');

const { employeesRouter } = require('./employeesRouter');

router.use(validadeLogin);
router.use(validatePass);
router.use(validateName);
router.use(validateOffice);
router.use(validateDepartment);
router.use(validateWage);
router.use(employeesRouter);

module.exports = router;