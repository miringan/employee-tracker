-- Seed initial departments
INSERT INTO department (department_name)
VALUES  ("Accounting"),
        ("Engineering"),
        ("Operations"),
        ("Sales"),
        ("Executive Management");

-- Seed initial roles
INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Accounting Manager", 110000.00, 1),
        (2, "Engineering Manager", 110000.00, 2),
        (3, "Operations Manager", 110000.00, 3),
        (4, "Sales Manager", 110000.00, 4),
        (5, "Head Honcho", 500000.00, 5),
        (6, "Accountant", 90000.00, 1),
        (7, "Software Dev", 100000.00, 2),
        (8, "Hardware Tech", 70000.00, 3),
        (9, "Sales Rep", 80000.00, 4);

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
        ("Jennifer", "Lawrence", 9, 5);
