const fs = require('fs').promises;
const path = require('path');

const employeesPath = path.resolve(__dirname, '../files/employees.json');

async function readEmployees() {
    try {
    const employees = await fs
        .readFile(employeesPath);
    const convEmployees = JSON.parse(employees);
    return convEmployees;
    } catch (e) {
        return e.message;
    }
}

async function findEmployee(id) {
    const allEmployees = await readEmployees();
    return allEmployees.find((employee) => employee.id === id);
}

async function addEmployee(nome, cargo, departamento, salario) {
    const allEmployees = await readEmployees();
    const newEmployee = {
        id: allEmployees.length > 0 ? allEmployees[allEmployees.length - 1].id + 1 : 1,
        nome,
        cargo,
        departamento,
        salario,
    };
    const newAllEmployees = [...allEmployees, newEmployee];
    await fs.writeFile(employeesPath, JSON.stringify(newAllEmployees));
    return newAllEmployees;
}

module.exports = {
    readEmployees, 
    findEmployee,
    addEmployee,
};
