-- create database students;
CREATE TABLE `students` (
    `studentID` INT NOT NULL AUTO_INCREMENT primary key,
    `studentName` VARCHAR(45) NOT NULL,
    `theoreticalMark` INT NULL,
    `practiceMark` INT NULL,
    `description` INT DEFAULT NULL,
    `class` VARCHAR(45) NOT NULL,
    `evaluate` VARCHAR(45) NULL
)
  
