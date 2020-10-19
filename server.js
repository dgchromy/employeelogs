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
              if (promptOptions.create === "Department") {
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
//creating function to add Department // 

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What department do you want to add?",
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was added!");
            searchDataBase();
          }
        );
      });
  }
//add role function// 
  function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What position title are you adding?",
        },
        {
          name: "salary",
          type: "input",
          message: "The salary for this position?",
        },
        {
          name: "departmentId",
          type: "input",
          message: "What departmentID are we adding?",
        }
      ])
      .then(function(answer) {

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
          },
          function(err) {
            if (err) throw err;
            console.log("Role Added!");
            searchDataBase();
          }
        );
      });
  }