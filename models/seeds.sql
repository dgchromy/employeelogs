USE employees_DB 

--seeds----


INSERT INTO department (id, name)
VALUES (1, 'Sales');

INSERT INTO department (id, name)
VALUES (2, 'Marketing');

INSERT INTO department (id, name)
VALUES (3, 'Accounting');

INSERT INTO department (id, name)
VALUES (4, 'Human Resources');

---employee role seeds---

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Senior salesman', 85000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'junior salesman', 55000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Assistant to the Manager', 50000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Head of Accounting', 75000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Senior Accountant', 68000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'Junior Accountant', 58000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Head of Marketing', 85000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Head of Human resources', 65000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Manager', 95000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'office Administrator', 85000, 4);


-----employee's---

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, 'Jim', 'Halpert', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (22, 'Ryan', 'Howard', 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (34, 'Dwight', 'Shrute', 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (44, 'Angela', 'Martin', 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (54, 'Oscar', 'Martinez', 5, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (64, 'Kevin', 'Malone', 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (74, 'Robert', 'California', 7, 74);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (84, 'Toby', 'Flenderson', 8, 84);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (94, 'Pam', 'Halpert', 10, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (95, 'Michael', 'Scott', 9, 95);