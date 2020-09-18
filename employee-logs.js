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
    let query = 'SELECT * FROM employee ';

    connection.query(query, function(err, res){
        if (err) 
        throw err;
        console.log('\n');

        console.table(res);

        mainMenu();

    });

}

function viewAllEmpByDept() {
    let deptArr = [];

    promisemysql.createConnection(connectionProperties)
    .then((conn) => {

        return conn.query('SELECT name FROM department');
    }).then(function(value){

        //for loop to place names within deptArray//
        deptQuery = value;
        for (i=o; i < value.length; i++) {
            deptArr.push(value[i].name);

        }
    }).then(() => {
        inquirer.prompt({
            name: 'department',
            type: 'list',
            message: 'Which department would you like to search?',
            choices: deptArr
        })
        .then((answer) => {
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Title' department.name AS Department, role.salary AS salary, concat(m.first_name, '' , m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department id WHERE department.name = '${answer.department}' ORDER BY ID ASC `;
            connection.query(query, (err, res) => {
                if(err) return err;

                console.log('\n');
                console.table(res);

                mainMenu();
            });
        });
    });

    //employee by role//

function viewAllEmpByRole(){
    let roleArr = [];

    promisemysql.createConnection(connectionProperties)
    .then((conn) => {
        return conn.query('SELECT title FROM role');
    }).then(function(roles){
        for (i=0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }
         }).then(() => {

      //user to select role//    

        inquirer.prompt({
            name: 'role',
            type: 'list',
            message: 'Which role would you like to search?',
            choices: roleArr
        })
        .then((answer) => {


            //query for all employees by role selected by user//

            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;

                console.log('\n');
                console.table(res);
                mainMenu();
            
            });
        });
    });

 }

}