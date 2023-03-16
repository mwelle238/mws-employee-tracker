//const express = require('express');
const prompter = require('./lib/Prompter');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
//const app = express();

// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root',
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

async function init(){
    let input;
    let departments;
    let roles;
    let employees;
    do {
        db.query("SELECT * FROM departments", function (err, results){
           // console.log(results);
            departments = results;
        }) // db query to get all departments
        db.query("SELECT * FROM roles", function (err, results){
            //console.log(results);
            roles = results;
        }) // db query to get all roles
        db.query("SELECT * FROM employees", function (err, results){
            //console.log(results);
            employees = results;
        }) // db query to get all employees
        input = await prompter.choicePrompt();
        switch (input){
            case prompter.promptChoices[0]: // view departments
                console.log(departments); 
                break; 
            case prompter.promptChoices[1]:  // view roles
                console.log(roles); 
                break;
            case prompter.promptChoices[2]: // view employees
                console.log(employees);
                break; 
            case prompter.promptChoices[3]: // add department 
                const deptName = await prompter.addDeptName();
                //db querry to add department
                db.query("INSERT INTO departments (name) VALUES (?)", deptName, (err, result) => {
                    if (err) {
                        result.serverStatus(400).json({error: err.message});
                        return;
                    }
                    result.json({
                        message: 'success',
                        data: deptName
                    });
                });
                break;
            case prompter.promptChoices[4]: // add role
                const title = await prompter.addRoleTitle();
                const salary = await prompter.addRoleSalary();
                const dept = await prompter.addRoleDept(departments);
                //db querry to add new role
                db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [title, salary, dept], 
                    (err, result) => {
                        if (err) {
                            result.serverStatus(400).json({error: err.message});
                            return;
                        }
                        result.json({
                            message: 'success',
                            data: [title, salary, dept]
                        });
                    });
                break;
            case prompter.promptChoices[5]: // add employee
                const first = await prompter.addEmpFName();
                const last = await prompter.addEmpLName();
                const role = await prompter.addEmpRole(roles);
                const manager = await prompter.addEmpManager(employees);
                // db querry to add employee
                db.query("INSERT INTO employees (firstName, LastName, role_id, manager_id) VALUES (?,?,?,?)", [first, last, role, manager], 
                    (err, result) => {
                        if (err) {
                            result.serverStatus(400).json({error: err.message});
                            return;
                        }
                        result.json({
                            message: 'success',
                            data: [first, last, role, manager]
                        });
                    });
                break;
            case prompter.promptChoices[6]: //update employee
                const emp = await prompter.selectEmployee(employees);
                const empRole = await prompter.updateEmpRole(roles);
                db.query("UPDATE roles SET role = ? WHERE id = ?", [empRole, emp], 
                (err, result) => {
                    if (err) {
                        result.serverStatus(400).json({error: err.message});
                        return;
                    }
                    result.json({
                        message: 'success',
                        data: [emp, empRole]
                    });
                });
                // db querry to update employee role
                break;
            case prompter.promptChoices[7]: // quit application
            default:
               input = 'quit';
        }
    } while (input !== 'quit');
    console.log("exiting application");
}

init();