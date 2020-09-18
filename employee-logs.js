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
        message: 'Main menu',
        choices: [
            'View all employee',
            'View employees by role',
            'View department',
            'View all manager',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update employee role',
            'Update employee manager',
            'Delete employee',
            'Delete role',
            'Delete department',
            'View department budgets'

        ]
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employee':
                viewAllEmp();
                break;

            case 'View all employees by department':
                viewAllEmpByDept();
                break;

            case 'View all employees by role':
                    viewAllEmpByRole();
                    break;
                
            case 'Add Employee':
                    addEmp();
                    break;  

            case 'Add Department':
                    addDept();
                    break; 

             case 'add role':
                    addRole();
                    break;

            case 'Update employee Role':
                   updateEmpRole();
                    break;

            case 'Update employee manager':
                    updateEmpMngr();
                    break;

            case 'view all employee manager':
                    viewAllEmpByMngr();
                    break;

             case 'Delete employee':
                    deleteEmp();
                    break;

            case 'View department budgets':
                    viewDeptBudget();
                    break;

            case 'Delete role':
                    deleteRole();
                    break;

            case 'Delete department':
                    deleteDept();
                    break;
            
        }
    });
}
//Employee view function//

function viewAllEmp(){
    let query = 'SELECT * FROM employee '
}