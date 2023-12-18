const fs = require('fs').promises;
const { join } = require('path');

async function readEmployees() {
    const path = '../files/employees.json';
    try {
    const employees = await fs
        .readFile(join(__dirname, path), 'utf-8');
    const convEmployees = JSON.parse(employees);
    return convEmployees;
    } catch (e) {
        return e.message;
    }
}

async function findEmployee(id) {
    const allEmployees = await readEmployees();
    const { employees } = allEmployees;
    return employees.find((employee) => employee.id === id);
}

module.exports = {
    readEmployees, 
    findEmployee,
};