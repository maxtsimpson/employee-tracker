USE employeeTracker;
delete from department;
delete from `role`;
delete from employee;

INSERT INTO department
(`name`)
values
('infrastructure'),
('development'),
('architecture');

INSERT INTO `role`
(title,salary,department_id)
values
('Infrastructure Manager',140000,(select id from department where `name` = 'infrastructure')),
('Development Manager',140000,(select id from department where `name` = 'development')),
('CloudMan1000',180000,(select id from department where `name` = 'architecture')),
('developer',90000,(select id from department where `name` = 'development')),
('engineer',80000,(select id from department where `name` = 'infrastructure')),
('architect',100000,(select id from department where `name` = 'architecture'));

INSERT INTO employee
(first_name,last_name,role_id,manager_id)
values
('tony','short',(select id from `role` where title = 'Infrastructure Manager'),null),
('jay','fat',(select id from `role` where title = 'Development Manager'),null),
('alan','tall',(select id from `role` where title = 'CloudMan1000'),null);

create table tempManagers (
  employeeID INT,
  title VARCHAR(30)
);

INSERT INTO tempManagers (employeeID,title) 
SELECT employeeID,title FROM manager;


INSERT INTO employee
(first_name,last_name,role_id,manager_id)
values
('brett','swall',(select id from `role` where title = 'developer'),(select employeeID from tempManagers where title = 'Development Manager')),
('dave','pool',(select id from `role` where title = 'engineer'),(select employeeID from tempManagers where title = 'Infrastructure Manager')),
('trevor','hafex',(select id from `role` where title = 'developer'),(select employeeID from tempManagers where title = 'Development Manager')),
('stefan','stefenson',(select id from `role` where title = 'architect'),(select employeeID from tempManagers where title = 'CloudMan1000'));

drop table tempManagers;