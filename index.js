const inquire = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');


// Ask the employee what to do
function run() {
    inquire
        .prompt([
            {
                type: "list",
                name: "selection",
                question: "What would you like to do?",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role",
                    "Quit"
                ]
            }
        ]).then((data) => {
            if (data.selection === "View All Departments") {
                viewAllDepartments();
                // run();
            } else if (data.selection === "View All Roles") {
                viewAllRoles();
                run(); 
            } else if (data.selection === "View All Employees") {
                viewAllEmployees();
                run(); 
            } else if (data.selection === "Add a Department") {
                createDepartment();
                // run();
            } else if (data.selection === "Add a Role") {
                createRole();
                run(); 
            } else if (data.selection === "Add an Employee") {
                createEmployee();
                run();
            } else if (data.selection === "Update an Employee Role") {
                updateEmployeeRole();
                run();
            } else {
                return;
            }
        })
}


// view all departments - READ - "SELECT * FROM [table_name]";
async function viewAllDepartments() {

    const departments = await db.query('SELECT * FROM department');

    console.table(departments);
    // console.log('\n');
    run();

}

// view all roles - 

async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles');

    console.table(roles);
    run();
    // console.log('\n');

}

// view all employees - READ - "SELECT * FROM [table_name]"
async function viewAllEmployees() {

    const employees = await db.query('SELECT * FROM employee');

    console.table(employees);
    run();
    // console.log('\n');

}

// add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"

async function createDepartment() {
    
    console.log("hey");
    const departmentInfo = await inquire
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Provide a department name."
            }
        ]);
        async function doThat (data) {
            const sql =`INSERT INTO department (department_name) 
                VALUES (${data.name})`;
            const params = roleInformation;
      
            db.query(sql, params, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                message: 'success',
                data: body
                });
            });
        };
    run();
}

// add a role - CREATE -

async function createRole() {

    // SELECT the existing departments out for the 'roles' table
    const departments = await db.query('SELECT * FROM department')

    // .map() the reults from 'roles' to question data for inquirer
    const departmentChoices = departments.map(department => {
        return{
            name: department.name,
            value: department.id
        }
    })

    // THEN prompt the user for role information (inquirer)
    const roleInformation = await inquire
        .prompt([
            {
                type: "input",
                name: "title",
                question: "Provide a role title."
            },
            {
                type: "number",
                name: "salary",
                question: "Provide a salary."
            },
            {
                type: "list",
                name: "department_id",
                question: "Select a department.",
                choices: departmentChoices
            }    
        ])
        // Take the user's answers and go INSERT them into the 'role' table
        .then((data) => {
            const sql = `INSERT INTO roles (title, salary, department_id) 
                VALUES (${data.title}, ${data.salary}, ${data.department_id.value})`;
            const params = roleInformation;
          
            db.query(sql, params, (err, result) => {
                if (err) {
                res.status(400).json({ error: err.message });
                return;
                }
                res.json({
                message: 'success',
                data: body
                });
            });
        });
    run();
}

// add an employee - CREATE -
async function createEmployee() {
    // grab all roles from roles table and store in an array
    const roles = await db.query('SELECT * FROM roles');

    const roleSelection = roles.map(roles => {
        return {
            title: roles.title,
            value: roles.id
        }
    })

    // grab managers from employees table and store in an array
    const employees = await db.query('SELECT * FROM employee');

    const managers = [];

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].roles_id === 1) {
            managers.push(employees[i]);
        }
    }

    const employeeInfo = await inquire
        .prompt([
            {
                type: "input",
                name: "first_name",
                question: "Provide a first name."
            },
            {
                type: "input",
                name: "last_name",
                question: "Provide a last name."
            },
            {
                type: "list",
                name: "roles_id",
                question: "Select the employee's role.",
                choices: roleSelection
            },
            {
                type: "list",
                name: "manager_id",
                question: "Select the employee's manager.",
                choices: managers
            }    
        ]).then((data) => {
            const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                VALUES (${data.first_name}, ${data.last_name}, ${data.roles_id.value}, ${data.manager_id.manager_id})`;
            const params = employeeInfo;
      
            db.query(sql, params, (err, result) => {
                if (err) {
                res.status(400).json({ error: err.message });
                return;
                }
                res.json({
                message: 'success',
                data: body
                });
            });
        })
    run();

}

// update an employee
async function updateEmployeeRole() {
    // grab all employees  
    const employees = await db.query('SELECT * FROM employee');

    // put deconstructed employee sql data into an array
    const employeeRoster = employees.map(employees => {
        return {
            first_name: employees.first_name,
            last_name: employees.last_name,
            value: employees.id
        }
    })

    // grab all roles
    const roles = await db.query('SELECT * FROM roles');

    // put deconstructed roles into an array
    const roleSelection = roles.map(roles => {
        return {
            title: roles.title,
            value: roles.id
        }
    })

    // grab managers from employees table and store in an array
    const employeeScan = await db.query('SELECT * FROM employee');

    const managers = [];

    for (var i = 0; i < employeeScan.length; i++) {
        if (employeeScan[i].roles_id === 1) {
            managers.push(employeeScan[i]);
        }
    }

    const employeeUpdates = await inquire
        .prompt([
            {
                type: "list",
                name: "employee",
                question: "Which employee will be updated?",
                choices: employeeRoster
            },
            {
                type: "list",
                name: "role",
                question: "What new role will the employee take?",
                choices: roleSelection
            },
            {
                type: "list",
                name: "manager",
                question: "Select the new manager for this employee.",
                choices: managers
            }
        ]).then((data) => {
            const sql = `
                UPDATE employee 
                SET roles_id = ${data.role.value}, manager_id = ${data.manager.value}
                WHERE id = ${data.employee.value.id}`;
            const params = employeeUpdates;
      
            db.query(sql, params, (err, result) => {
                if (err) {
                res.status(400).json({ error: err.message });
                return;
                }
                res.json({
                message: 'success',
                data: body
                });
            });
        })
    run();
}


run();