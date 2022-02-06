-- Seed initial departments
INSERT INTO department (department_name)
VALUES  ("Accounting"),
        ("Engineering"),
        ("Operations"),
        ("Sales"),
        ("Executive Management")

-- Seed initial roles
INSERT INTO roles (title, salary, department_id)
VALUES  ("Accounting Manager", 110000, 1),
        ("Engineering Manager", 110000, 2),
        ("Operations Manager", 110000, 3),
        ("Sales Manager", 110000, 4),
        ("Head Honcho", 500000, 5),
        ("Accountant", 90000, 1),
        ("Software Dev", 100000, 2),
        ("Hardware Tech", 70000, 3),
        ("Sales Rep", 80000, 4)

-- Seed initial Employees
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  ("Cathie", "Woods", 5, NULL),
        ("Michael", "Douglas", 1, 1),
        ("John", "Cena", 2, 1),
        ("Satoshi", "Nakamoto", 3, 1),
        ("Serena", "Williams", 4, 1),
        ("Dave", "Filoni", 6, 2),
        ("Katee", "Sackoff", 7, 3),
        ("Jon", "Favreau", 8, 4),
        ("Jennifer", "Lawrence", 9, 5),
