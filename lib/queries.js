class Queries{

    static getDepartments = "SELECT * FROM departments";
    static getRoles = "SELECT * FROM roles";
    static getEmployees = "SELECT * FROM employees";
    static getRolesTable = `SELECT roles.id, 
                                roles.title, 
                                roles.salary, 
                                departments.name AS department 
                            FROM roles
                            JOIN departments ON roles.department_id=departments.id`;
    static getEmployeesTable = `SELECT emp.id, 
                                    emp.firstName AS first, 
                                    emp.lastName AS last, 
                                    roles.title, 
                                    departments.name AS department, 
                                    roles.salary, 
                                    CONCAT(man.firstName , ' ' , man.lastName) AS manager
                                FROM employees emp
                                JOIN roles ON emp.role_id = roles.id
                                JOIN departments ON roles.department_id=departments.id
                                LEFT OUTER JOIN employees man ON emp.manager_id = man.id`;
    static addDepartment = "INSERT INTO departments (name) VALUES (?)";
    static addRole = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
    static addEmployee = "INSERT INTO employees (firstName, LastName, role_id, manager_id) VALUES (?,?,?,?)";
    static updateEmployeeRole = "UPDATE employees SET role_id = ? WHERE id = ?"
}

module.exports = Queries;