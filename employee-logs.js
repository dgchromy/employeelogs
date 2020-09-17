const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const promisemysql = require('promise-mysql');

const connectionProperties = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sunshine6992!',
    database: 'employee_db' 
}

const connection = mysql.createConnection(connectionProperties);

connection.connect((err) => {
    console.log('\n The Employee Tracker.. \n');
    mainMenu()
});

function mainMenu() {
inquirer
    .prompt({
        name: "action",
        type: 'list',
        message: 'Main menu'
        choices: [
            'View all employee',
            'View employees by role',
            'View department',
            'View all manager'
        ]
    })
}
