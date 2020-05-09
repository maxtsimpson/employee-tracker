var mysql = require('mysql');
var MySQLDb = require('../Develop/db/mySqlDB')
var EmployeeRepo = require('../Develop/db/employeeRepo')

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "employeetracker",
  password: "ae92r4afe"
}

db = new MySQLDb(dbConfig)

const employeeRepo = new EmployeeRepo(db)

employeeRepo.getEmployees()
.then((employees) => console.table(employees))
.catch((error) => {console.error(error)})

const exitApp = () => { 

  con.destroy()
}
  

