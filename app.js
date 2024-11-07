const express = require('express');
const bodyParser = require('body-parser');
const { sql, connectToDb } = require('./db/config');
const path = require('path');
const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Connect to database
connectToDb();

// Route to display the employees
app.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM employee');
        res.render('index', { employees: result.recordset });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).send('Error fetching employees');
    }
});

// Route to create a new employee
app.post('/add-employee', async (req, res) => {
    const { name, position, salary } = req.body;
    try {
        const request = new sql.Request();
        await request.query(`INSERT INTO employee (name, position, salary) VALUES ('${name}', '${position}', ${salary})`);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send('Error adding employee');
    }
});

// Route to update employee information
app.post('/update-employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    try {
        const request = new sql.Request();
        await request.query(`UPDATE employee SET name = '${name}', position = '${position}', salary = ${salary} WHERE id = ${id}`);
        res.redirect('/');
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).send('Error updating employee');
    }
});

// Route to delete an employee
app.post('/delete-employee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const request = new sql.Request();
        await request.query(`DELETE FROM employee WHERE id = ${id}`);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).send('Error deleting employee');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
