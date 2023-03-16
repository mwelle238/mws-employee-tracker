INSERT INTO departments (name)
VALUES  ("Administration"),
        ("Accounting"),
        ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES  ("CEO", 200000, 1),
        ("Controller", 100000, 2),
        ("AR associate", 40000, 2),
        ("AP associate", 40000, 2),
        ("Ops Manager", 80000, 3),
        ("Senior Technician", 65000, 3),
        ("Junior Technician", 50000, 3),
        ("Laborer", 40000, 3);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES  ("Mike", "Welle", 1, null),
        ("Sydnee", "Trammel", 2, 1),
        ("George", "Costanza", 5, 1),
        ("Jacob", "Wetterling", 7, 3);
        