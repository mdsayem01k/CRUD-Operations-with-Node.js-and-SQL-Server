require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        driver: process.env.DB_DRIVER,
        trustedConnection: false,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

async function connectToDb() {
    try {
        await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = { sql, connectToDb };
