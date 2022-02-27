// import packages
const inquire = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');


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
            } else if (data.selection === "View All Roles") {
                viewAllRoles();
            } else if (data.selection === "View All Employees") {
                viewAllEmployees();
            } else if (data.selection === "Add a Department") {
                createDepartment();
            } else if (data.selection === "Add a Role") {
                createRole();
            } else if (data.selection === "Add an Employee") {
                createEmployee();
            } else if (data.selection === "Update an Employee Role") {
                updateEmployeeRole();
            } else {
                return;
            }
        })
}


// view all departments - READ - "SELECT * FROM [table_name]";
async function viewAllDepartments() {

    const departments = await db.query('SELECT * FROM department');

    console.table(departments);

    run();

}

// view all roles 
async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles INNER JOIN department ON roles.department_id=department.id');

    console.table(roles);

    run();

}

// view all employees 
async function viewAllEmployees() {

    const employees = await db.query('SELECT * FROM employee INNER JOIN roles ON employee.roles_id=roles.id');

    console.table(employees);

    run();

}

// add a department 
async function createDepartment() {
    
    // Ask the user to provide a department name.
    inquire
        .prompt([
            {
                type: "input",
                name: "department_name",
                message: "Provide a department name."
            }
        ])
        // Take the user's answers and go INSERT them into the 'role' table
        .then((data) => {
            console.log(data);
            const sql = `INSERT INTO department (department_name) 
                VALUES ("${data.department_name}")`;
            db.query(sql, (err, result) => {
                if (err) throw err; 
                console.log('New department added to departments.');
                if (result) {
                    run();
                }
            });
        })  
}

// add a role 
async function createRole() {

    // SELECT the existing departments out for the 'roles' table
    const departments = await db.query('SELECT * FROM department')

    // .map() the reults from 'roles' to question data for inquirer
    const departmentChoices = departments.map(department => {
        return {
            name: department.department_name,
            value: department.id
        }
    })

    // THEN prompt the user for role information (inquirer)
    inquire
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Provide a role title."
            },
            {
                type: "number",
                name: "salary",
                message: "Provide a salary."
            },
            {
                type: "list",
                name: "department_id",
                message: "Select a department.",
                choices: departmentChoices
            }    
        ])
        // Take the user's answers and go INSERT them into the 'role' table
        .then((data) => {
            console.log(data);
            const sql = `INSERT INTO roles (title, salary, department_id) 
                VALUES ("${data.title}", ${data.salary}, ${data.department_id})`;
            db.query(sql, (err, result) => {
                if (err) throw err; 
                console.log('New role added to roles.');
                if (result) {
                    run();
                }
            });
        })  
}

// add an employee 
async function createEmployee() {
    // grab all roles from roles table and store in an array
    const roles = await db.query('SELECT * FROM roles');

    // .map() the reults from 'roles' to question data for inquirer
    const roleSelection = roles.map(roles => {
        return {
            name: roles.title,
            value: roles.id
        }
    })

    console.log(roleSelection);
    // grab managers from employees table and store in an array
    const employees = await db.query('SELECT * FROM employee');

    // .map() the reults from 'employees' to question data for inquirer
    const managers = employees.map(employees => {
        return {
            name: employees.first_name + " " + employees.last_name,
            value: employees.id
        }
    });

    // ask the user for information about the new employee
    inquire
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Provide a first name."
            },
            {
                type: "input",
                name: "last_name",
                message: "Provide a last name."
            },
            {
                type: "list",
                name: "roles_id",
                message: "Select the employee's role.",
                choices: roleSelection
            },
            {
                type: "list",
                name: "manager_id",
                message: "Select the employee's manager.",
                choices: managers
            }    
        ]).then((data) => {
            const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                VALUES ("${data.first_name}", "${data.last_name}", ${data.roles_id}, ${data.manager_id})`;
            db.query(sql, (err, result) => {
                if (err) throw err; 
                console.log('New employee added to employees.');
                if (result) {
                    run();
                }
            });
        })
}

// update an employee
async function updateEmployeeRole() {
    // grab all employees  
    const employees = await db.query('SELECT * FROM employee');

    // put deconstructed employee sql data into an array
    const employeeRoster = employees.map(employees => {
        return {
            name: employees.first_name + " " + employees.last_name,
            value: employees.id
        }
    })

    // grab all roles
    const roles = await db.query('SELECT * FROM roles');

    // put deconstructed roles into an array
    const roleSelection = roles.map(roles => {
        return {
            name: roles.title,
            value: roles.id
        }
    })

    // ask the user information regarding what to update on the employee
    const employeeUpdates = await inquire
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee will be updated?",
                choices: employeeRoster
            },
            {
                type: "list",
                name: "role",
                message: "What new role will the employee take?",
                choices: roleSelection
            },
            {
                type: "list",
                name: "manager",
                message: "Select the new manager for this employee.",
                choices: employeeRoster
            }
        ]).then((data) => {
            const sql = `
                UPDATE employee 
                SET roles_id = ${data.role}, manager_id = ${data.manager}
                WHERE id = ${data.employee}`;
      
            db.query(sql, (err, result) => {
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