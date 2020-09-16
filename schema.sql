DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    name   VARCHAR(30) NOT NULL,   
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY (department_id) REFRENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    job_title INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (job_title) REFRENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFRENCES employee(id) ON DELETE CASCADE 
);