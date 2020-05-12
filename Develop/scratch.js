var MySQLDb = require('./db/mySqlDB')
var EmployeeRepo = require('./db/employeeRepo')
var RoleRepo = require('./db/roleRepo')
var Employee = require('./model/employee')

//THIS IS A SCRATCHPAD DO NOT MARK
const dbConfig = {
    host: "localhost",
    user: "root",
    database: "employeetracker",
    password: "ae92r4afe"
}

db = new MySQLDb(dbConfig)

const roleRepo = new RoleRepo(db)
const employeeRepo = new EmployeeRepo(db, roleRepo)

// employeeRepo.getEmployeeByID(1)
//     .then((employees) => {
//         console.table(employees)
//         db.close()
//     })
//     .catch((error) => { console.error(error) })

// employeeRepo.getManagerAndRoleForEmployee(1, 1)
//     .then(([manager, role]) => {
//         console.log("in the then")
//         console.log({ manager })
//         console.log({ role })
//         let employee = new Employee(5, "sam", "wayne", role, manager)
//         console.log({ employee })
//         db.close()
//         return employee

//     })
//     .catch((error) => error)

// const employeeData = { id: 1, first_name: "sam", last_name: "wayne", role_id: 1, manager_id: 1 }
// employeeRepo.createEmployeeObject(employeeData)
//     .then(employee => { 
//         console.log({ employee })
//         db.close()
//     })
//     .catch((error) => error)

// employeeRepo.getEmployeeByID(1)
// .then(employee => { 
//     console.log({ employee })
//     db.close()
// })
// .catch((error) => error)

// employeeRepo.getEmployees()
// .then(employees => { 
//     console.table(employees)
//     db.close()
// })
// .catch((error) => error)

const toFunctionName = (phrase) => {
    //change the phrase to camel case
    let functionName = phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    //change the first letter of the first word to lowercase and join the whole string together to remove spaces
    functionName = functionName[0].charAt(0).toLowerCase() + functionName.slice(1).split(" ").join("") 

    return functionName;
  };
  
  let result = toFunctionName('maRy hAd a lIttLe LaMb');
  console.log(result);

    // new Promise((resolve, reject) => {
    //     console.log(this)
    //     let returnError
    //     let manager
    //     if (managerID !== null) {
    //         manager = this.getEmployeeByID(managerID)
    //             .then((manager) => manager)
    //             .catch((error) => returnError = error)
    //     } else {
    //         manager = null
    //     }

    //     let role
    //     if (role !== null) {
    //         role = this.roleRepo.getRoleByID(roleID)
    //             .then((role) => role)
    //             .catch((error) => returnError = error)
    //     } else {
    //         role = null
    //     }
    //     console.log({ manager })
    //     console.log({ role })
    //     resolve([manager,role])
    //     reject(returnError)
    // })