const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const promisemysql = require('promise-mysql');

const connectionProperties = {
    host: 'localhost',
    port: 4200,
    user: 'root',
    password: 'sunshine6992!',
    database: 'employee_db' 
}
