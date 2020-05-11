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

employeeRepo.getManagerAndRoleForEmployee(1, 1)
    .then(([manager, role]) => {
        console.log("in the then")
        console.log({ manager })
        console.log({ role })
        // let employee = new Employee(id, first_name, last_name, role, manager)
        return
    })
    .catch((error) => error)



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