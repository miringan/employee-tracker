const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'tennis',
      database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
);

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;