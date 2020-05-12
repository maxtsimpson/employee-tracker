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
const employeeRepo = new EmployeeRepo(db)
const roleRepo = new RoleRepo(db)
const departmentRepo = new DepartmentRepo(db)

const questions = new Questions(departmentRepo,roleRepo)
const answerFunctions = new AnswerFunctions(inquirer,questions,employeeRepo,roleRepo,departmentRepo);

const exitApp = () => { 
  con.destroy()
}

function askInitial() {
  inquirer.prompt(questions.initialPrompt).then(answers => {
    answerFunctions[answers.mainMenu]()
  });
}

questions.updateQuestionChoiceLists(); //this should be finished by the time a user gets to the question
askInitial();

// employeeRepo.getEmployees()
// .then((employees) => console.table(employees))
// .catch((error) => {console.error(error)})


  

