const inquirer = require("inquirer");

class Prompter{
    static promptChoices = ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee's role", "Quit Application"];

    static async choicePrompt(){
        const input = await inquirer.prompt({ 
            type: "list", message: "What would you like to do?: ", name: 'choice',  choices: this.promptChoices});       
            return input.choice; 
    }
    static async addDeptName(){
        const input = await inquirer.prompt({ type: "input", message: "What is the name of the new Department?:", name: 'name'});
        if (!input.name) {
            console.log("No name entered.  Try Again");
            return this.addDeptName();
        } else {
            return input.name;
        }
    }
    static async addRoleTitle(){
        const input = await inquirer.prompt({type: "input", message: "What is the Job Title?:", name: "title" });
        if (!input.title) {
            console.log("No title entered.  Try again");
            return this.addRole();
        } else {
            return input.title;
        }        
    }
    static async addRoleSalary(){
        const input = await inquirer.prompt({type: "input", message: "What is the Job Salary?:", name: "salary" });
        if (!input.salary) {
            console.log("No title entered.  Try again");
            return this.addRoleSalary();
        } else {
            return input.salary;
        }        
    }
    static async addRoleDept(departments){ // passed the departments object array, gets choices from the names, matches the choice back to the array to get the id#
        if (!departments){
            return null;
        }
        let deptNames = departments.map( (obj) => obj.name );
        const input = await inquirer.prompt({type: "list", message: "Select Department:", name: "dept", choices: deptNames});
        console.log(input.dept);
        for (let i=0; i<departments.length; i++){
            if (input.dept == departments[i].name) {
                console.log(departments[i].id);
                return departments[i].id;
            }
        }
        return null;
    }
    static async addEmpFName(){
        const input = await inquirer.prompt({type: "input", message: "Enter Employee First Name:", name: "first" });
        if (!input.first) {
            console.log("No name entered.  Try again");
            return this.addEmpFName();
        } else {
            return input.first;
        }        
    }
    static async addEmpLName(){
        const input = await inquirer.prompt({type: "input", message: "Enter Employee Last Name:", name: "last" });
        if (!input.last) {
            console.log("No name entered.  Try again");
            return this.addEmpLName();
        } else {
            return input.last;
        }        
    }
    static async addEmpRole(roles){  // passed the roles object array, gets choices from the names, matches the choice back to the array to get the id#
        let roleNames = [];
        for (let i=0; i<roles.length; i++){
            roleNames.push(roles[i].title);
        }
        const input = await inquirer.prompt({type: "list", message: "Select Employee Role:", name: "role", choices: roleNames });
        for (let i=0; i<roles.length; i++){
            if (input.role = roles[i].title) {
                return roles[i].id;
            }
        }
        return null;       
    }
    static async addEmpManager(managers){  // passed the employees object array, gets choices from the names, matches the choice back to the array to get the id#
        if (!managers){
            return null;
        }
        let managerNames = managers.map( (obj) => `${obj.firstName} ${obj.lastName}` );
        const input = await inquirer.prompt({type: "list", message: "Select Manager:", name: "manager", choices: managerNames });
        for (let i=0; i<managerNames.length; i++){
            if (input.manager == managerNames[i]) {
                console.log(managers[i].id);
                return managers[i].id;
            }
        }
        return null;     
    }
    static async selectEmployee(employees){
        if (!employees) {
            return null;
        }
        let names = employees.map( (obj) => `${obj.firstName} ${obj.lastName}` );
        const input = await inquirer.prompt({type: "list", message: "Select Employee to Update:", name: "name", choices: names });
        for (let i=0; i<names.length; i++){
            if (input.name == names[i]) {
                console.log(employees[i].id);
                return employees[i].id;
            }
        }
        return null; 
    }
    static async updateEmpRole(roles){
        if (!roles){
            return null;
        }
        let roleNames = roles.map( (obj) => obj.title );
        const input = await inquirer.prompt({type: "list", message: "Select new Role:", name: "role", choices: roleNames});
        for (let i=0; i<roles.length; i++){
            if (input.role == roles[i].title) {
                return roles[i].id;
            }
        }
        return null;   
    }
}

module.exports = Prompter;