const inquire = require('inquirer');
const db = require('./db/connection');

inquire
    .prompt([
        {
            type: "list",
            name: "department_id",
            question: "Select a department.",
            choices: [
                {name: "Sales", value: 1},
                {name: "Accounting", value: 2}
            ]
        }    
    ])
    .then((answers) => {
        console.log(answers);
    })


// present user with options

db.query('SELECT * FROM employeetracker_db')
    .then((results) => {
        console.table(results);
    });

// view all departments - READ - "SELECT * FROM [table_name]";
async function viewAllDepartments() {

    const departments = await db.query('SELECT * FROM department');

    console.table(departments);

}

// view all roles - 

async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles');

    console.table(roles);

}

// view all employees - READ - "SELECT * FROM [table_name]"
async function viewAllEmployees() {

    const employees = await db.query('SELECT * FROM employee');

    console.table(employees);

}

// add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"

// add a role - CREATE -

async function createRole() {

    // SELECT the existing departments out for the 'roles' table
    const departments = [
        {
            id: 1,
            name: "Sales"
        },
        {
            id: 2,
            name: "Accounting"
        }
    ];

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
                name: "Salary",
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
        .then((roleInformation) => {
            db.
        })
}





// add an employee - CREATE -


// update an employee