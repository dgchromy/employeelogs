const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sunshine6992!',
    database: 'employees_DB' 
});


connection.connect(function (err){
    if (err) throw err; 
    console.log('\n The Employee Tracker.. \n');
    searchDataBase()
});

function searchDataBase() {
    inquirer
      .prompt({
        name: "create",
        type: "list",
        message: "Create a [Department], a [Position], an [Employee] or [View] the following:",
              choices: ["Department", "Role", "Employee", "View"]
          })
          .then(function(promptOptions){
              if (promptOptions.create === "Departments") {
                  addDepartment();
              }
              else if(promptOptions.create === "Position") {
                  addPosition();
              }
              else if(promptOptions.create === "Employee") {
                  addEmployee();
              }
              else if(promptOptions.create === "View") {
                  viewData();
              }
              else{
                  connection.end();
              }
          })
  }

  