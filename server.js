const express = require('express');
const prompter = require('/lib/prompter');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

async function init(){
    do {
        let input = await prompter.choicePrompt();
        let departments; //db query to get all departments
        let roles;  //db query to get all roles
        let employees; //db query to get all employees
        switch (input){
            case prompter.promptChoices[0]: break; // view departments
            case prompter.promptChoices[1]: break; // view roles
            case prompter.promptChoices[2]: break; // view employees
            case prompter.promptChoices[3]: // add department 
                deptName = await prompter.addDeptName();
                //db querry to add department
                break;
            case prompter.promptChoices[4]: // add role
                roleTitle = await prompter.addRoleTitle();
                roleSalary = await prompter.addRoleSalary();
                roleDept = await prompter.addRoleDept(departments);
                //db querry to add new role
                break;
            case prompter.promptChoices[5]: // add employee
                empFirst = await prompter.addEmpFName();
                empLast = await prompter.addEmpLName();
                empRole = await prompter.addEmpRole(roles);
                empManager = await prompter.addEmpManager(employees);
                // db querry to add employee
                break;
            case prompter.promptChoices[6]: //update employee
                empRole = await prompter.updateEmpRole(roles);
                // db querry to update employee role
            case prompter.promptChoices[7]: // quit application
            default:
                return;
        }
    } while (input !== 'Quit Application');
    console.log("exiting application");
}
