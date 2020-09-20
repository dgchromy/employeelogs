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
}
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
    function addEmp(){
        let roleArr = [];
        let managerArr = [];
        promisemysql.createConnection(connectionProperties
            ).then((conn) => {
                return Promise.all([
                    conn.query('SELECT id, title FROM role ORDER BY title ASC'),
                    conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
                ]);
            }).then(([role, managers]) => {
                for (i=0; i < roles.length; i++){
                    roleArr.push(roles[i].title);
                }

                for (i=0; i < managers.length; i++){
                    managerArr.push(managers[i].employee); 
                    }
              return Promise.all([roles, managers]);  
            }).then(([roles, managers]) => {
                managerArr.unshift('--');

                inquirer.prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'First Name: ',

                        validate: function (input){
                            if (input === ''){
                                console.log('**FIELD REQUIRED**');
                                return false;
                            }
                            else{ 
                                return true;
                            }
                        }
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Lastname name: ',
                        
                        validate: function(input){
                            if (input === ''){
                                console.log('**Field REQUIRED**');
                                return false;
                            }
                            else{
                                return true
                            }
                        }
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'what is their role?',
                        choices: roleArr
                    },{
                        name: 'manager',
                        type: 'list',
                        message: 'Who is their manager?',
                        choices: managerArr
                    }]).then ((answer) => {
                        
                        let roleID; 

                        let managerID = null;

                        for (i=0; i < roles.length; i++){
                            if (answer.role == roles[i].title){
                                roleID = roles[i].id;
                            }
                        }

                        for (i=0; i < managerArr.length; i++){
                            if (answer.manager == managers[i].employee){
                                managerID = managers[i].id;
                            }
                        }

                        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                    if(err) return err;

                    console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                    mainMenu();
                    });
                
                });
    });
}
function addRole(){
    

    let departmentArr = [];

    promisemysql.createConnection(connectionProperties)
    .then((conn) => {

        return conn.query('SELECT id, name FROM department ORDER BY name ASC');

    
    }).then ((departments) => {
        for (i=0; i < departments.length; i++){
            departmentArr.push(departments [i].name);
        }

        return departments;
    }).then((departments) => {
        inquirer.prompt([
            {

                name: 'roleTitle',
                type: 'input',
                message: 'Role title:'
            },
            {
                name:'salary',
                type: 'number',
                message: 'Salary: ',
            },
            {
                name: 'dept',
                type: 'list',
                message: 'Department: ',
                choices: departmentArr
            }]).then ((answer) => {
                let deptID;

                for (i=0; i < departments.lenght; i++){
                    if (answet.dept == departments[i].name){
                        deptID = departments[i].id;

                    }
                }
                connection.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err) return err;
                    console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                    mainMenu();
            });
         });

    });
}

