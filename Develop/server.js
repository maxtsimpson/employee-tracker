const mysql = require('mysql');
const inquirer = require('inquirer');
const MySQLDb = require('../Develop/db/mySqlDB')
const EmployeeRepo = require('../Develop/db/employeeRepo')
const RoleRepo = require('../Develop/db/roleRepo')
const DepartmentRepo = require('../Develop/db/departmentRepo')
const Questions = require("./questions")
const AnswerFunctions = require("./answerFunctions")

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "employeetracker",
  password: "ae92r4afe"
}

const db = new MySQLDb(dbConfig)
const questions = new Questions()
const employeeRepo = new EmployeeRepo(db)
const roleRepo = new RoleRepo(db)
const departmentRepo = new DepartmentRepo(db)

const answerFunctions = new AnswerFunctions(inquirer,questions,employeeRepo,roleRepo,departmentRepo);



const addADepartment = () => {
  console.log("in addADepartment")
}

const exitApp = () => { 
  con.destroy()
}

function ask() {
  inquirer.prompt(questions.initialPrompt).then(answers => {
    answerFunctions[answers.mainMenu]()
  });
}

ask();

// employeeRepo.getEmployees()
// .then((employees) => console.table(employees))
// .catch((error) => {console.error(error)})


  

