const prompter = require('./lib/Prompter');
const queries = require('./lib/Queries');
const cTable = require('console.table');
const mysql = require('mysql2');

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
    let roleTable;
    let empTable;
    do {
        //update objects so any additions will be shown 
        // db query to get departments
        db.query(queries.getDepartments, async function (err, result){
            if (err) { console.error(err); return; }
            departments = result;
        });
        // db query to get roles
        db.query(queries.getRoles, async function (err, result){
            if (err) { console.error(err); return; }
            roles = result;
        }); 
        // db query to get employees
        db.query(queries.getEmployees, async function (err, result){
            if (err) { console.error(err); return; }
            employees = result;
        }); 
        // db query to get a table of roles joined with departments
        db.query(queries.getRolesTable, async function (err, result){
            if (err) { console.error(err); return; }
            roleTable = result;
        });
        // db query to get a table of employees joined with roles, departments, and itself
        db.query(queries.getEmployeesTable, async function (err, result){
            if (err) { console.error(err); return; }
            empTable = result;
        });
        // prompt user for an action
        input = await prompter.choicePrompt();
        switch (input){
            case prompter.promptChoices[0]: // view departments
                console.log('View Departments');
                console.table(departments); 
                break; 
            case prompter.promptChoices[1]:  // view roles
                console.log("View Roles");
                console.table(roleTable); 
                break;
            case prompter.promptChoices[2]: // view employees
                console.log("View Employees");
                console.table(empTable);
                break; 
            case prompter.promptChoices[3]: // add department 
                const deptName = await prompter.addDeptName();
                //db querry to add department
                db.query(queries.addDepartment, deptName, async function (err, result){
                    if (err) { console.error(err); return; }
                    console.log(`${deptName} added to Departments`);
                });
                break;
            case prompter.promptChoices[4]: // add role
                const title = await prompter.addRoleTitle();
                const salary = await prompter.addRoleSalary();
                const dept = await prompter.addRoleDept(departments);
                //db querry to add new role
                db.query(queries.addRole, [title, salary, dept], async function (err, result){
                    if (err) { console.error(err); return; }
                    console.log(`${title} added to Roles under department: ${dept} and a salary of ${salary}`);
                }); 
                break;
            case prompter.promptChoices[5]: // add employee
                const first = await prompter.addEmpFName();
                const last = await prompter.addEmpLName();
                const role = await prompter.addEmpRole(roles);
                const manager = await prompter.addEmpManager(employees);
                // db querry to add employee
                db.query(queries.addEmployee, [first, last, role, manager], async function (err, result){
                    if (err) { console.error(err); return; }
                    console.log(`${first} ${last} added to Employees`);
                });
                break;
            case prompter.promptChoices[6]: //update employee
                const emp = await prompter.selectEmployee(employees);
                const empRole = await prompter.updateEmpRole(roles);
                // db querry to update employee role
                db.query(queries.updateEmployeeRole, [empRole, emp], async function (err, result){
                    if (err) { console.error(err); return; }
                    console.log(`Employee Role Updated`);
                }); 
                break;
            case prompter.promptChoices[7]: // quit application
            default:
               input = 'quit';
        }
    } while (input !== 'quit');
    console.log("exiting application");
}

init();