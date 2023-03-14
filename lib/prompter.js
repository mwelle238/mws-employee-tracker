const inquirer = require("inquirer");


class Prompter{
    
    constructor() {
        this.promptChoices = ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add an Employee", "Add a Role", "Update an Employee's role", "Quit Application"];
    }
    

    async choicePrompt(){
        const choice = await inquirer.prompt({ 
            type: "list", message: "What would you like to do?: ", name: 'choice',  choices: promptChoices});        
            return choice; 
    }

    async addDeptName(){
        const dept = await inquirer.prompt({ type: "input", message: "What is the name of the new Department?:", name: 'newDeptName'});
        if (!dept.name) {
            console.log("No name entered.  Try Again");
            return this.addDeptName();
        } else {
            return dept.name;
        }
    }

    async addRoleTitle(){
        const role = await inquirer.prompt({type: "input", message: "What is the Job Title?:", name: "title" });
        if (!role.title) {
            console.log("No title entered.  Try again");
            return this.addRole();
        } else {
            return role.title;
        }        
    }

    async addRoleSalary(){
        const role = await inquirer.prompt({type: "input", message: "What is the Job Salary?:", name: "salary" });
        if (!role.salary) {
            console.log("No title entered.  Try again");
            return this.addRoleSalary();
        } else {
            return role.salary;
        }        
    }

    async addRoleDept(departments){
        const role = await inquirer.prompt({type: "list", message: "Select Department:", name: "dept", choices: departments});
        return role.dept;
    }

    async addEmpFName(){
        const emp = await inquirer.prompt({type: "input", message: "Enter Employee First Name:", name: "first" });
        if (!emp.first) {
            console.log("No name entered.  Try again");
            return this.addEmpFName();
        } else {
            return emp.first;
        }        
    }
    async addEmpLName(){
        const emp = await inquirer.prompt({type: "input", message: "Enter Employee Last Name:", name: "last" });
        if (!emp.last) {
            console.log("No name entered.  Try again");
            return this.addEmpLName();
        } else {
            return emp.last;
        }        
    }
    async addEmpRole(roles){
        const emp = await inquirer.prompt({type: "list", message: "Select Employee Role:", name: "role", choices:roles });
        return emp.role;        
    }
    async addEmpManager(managers){

        const emp = await inquirer.prompt({type: "list", message: "Select Employee Manager:", name: "manager", choices:managers});
        return emp.manager;       
    }
    async updateEmpRole(roles){
        const emp = await inquirer.prompt({type: "list", message: "Select Employee's new role:", name: "role", choices:roles });
        return emp.role;        
    }

}

module.exports = Prompter;