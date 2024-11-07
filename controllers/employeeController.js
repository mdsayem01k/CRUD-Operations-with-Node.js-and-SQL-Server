// controllers/employeeController.js
const { sql } = require('../db/config');

async function createEmployee(name, position, salary) {
    try {
        const request = new sql.Request();
        await request.input('name', sql.NVarChar, name)
                     .input('position', sql.NVarChar, position)
                     .input('salary', sql.Decimal, salary)
                     .query('INSERT INTO employee (name, position, salary) VALUES (@name, @position, @salary)');
        console.log("Employee created successfully.");
    } catch (err) {
        console.error("Error creating employee:", err);
    }
}

async function getEmployees() {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM employee');
        console.log("Employees:", result.recordset);
    } catch (err) {
        console.error("Error fetching employees:", err);
    }
}

async function updateEmployee(id, name, position, salary) {
    try {
        const request = new sql.Request();
        await request.input('id', sql.Int, id)
                     .input('name', sql.NVarChar, name)
                     .input('position', sql.NVarChar, position)
                     .input('salary', sql.Decimal, salary)
                     .query('UPDATE employee SET name = @name, position = @position, salary = @salary WHERE id = @id');
        console.log("Employee updated successfully.");
    } catch (err) {
        console.error("Error updating employee:", err);
    }
}

async function deleteEmployee(id) {
    try {
        const request = new sql.Request();
        await request.input('id', sql.Int, id)
                     .query('DELETE FROM employee WHERE id = @id');
        console.log("Employee deleted successfully.");
    } catch (err) {
        console.error("Error deleting employee:", err);
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
};
