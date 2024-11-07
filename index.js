const sql = require('mssql');

var config = {
    server: '192.168.216.26',
    database: 'BlueChipDB',
    user: 'sa',
    password: 'City@123',
    port: 1433,
    options: {
        driver: 'ODBC Driver 17 for SQL Server',  // Specify the driver here
        trustedConnection: false,
        enableArithAbort: true,  // Add this for compatibility
        trustServerCertificate: true  // For self-signed SSL certificates, if applicable
    }
};

sql.connect(config, function (err) {
    if (err) {
        console.error("Connection error:", err);
        return;
    }

    var request = new sql.Request();
    request.query("select top 5 *  from trd_bo", function (err, result) {
        if (err) {
            console.error("Query error:", err);
        } else {
            console.log("Query result:", result);
        }
    });
});
