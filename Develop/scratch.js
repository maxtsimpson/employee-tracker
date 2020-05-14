var Employee = require('./model/employee')
const mysql = require('mysql');
const inquirer = require('inquirer');
const MySQLDb = require('../Develop/db/mySqlDB')
const EmployeeRepo = require('../Develop/db/employeeRepo')
const RoleRepo = require('../Develop/db/roleRepo')
const DepartmentRepo = require('../Develop/db/departmentRepo')
const Questions = require("./questions")
const AnswerFunctions = require("./answerFunctions")


//THIS IS A SCRATCHPAD DO NOT MARK
const dbConfig = {
    host: "localhost",
    user: "root",
    database: "employeetracker",
    password: "ae92r4afe"
}

const db = new MySQLDb(dbConfig)
const roleRepo = new RoleRepo(db)
const employeeRepo = new EmployeeRepo(db,roleRepo)
const departmentRepo = new DepartmentRepo(db)

const questions = new Questions(departmentRepo,roleRepo)
const answerFunctions = new AnswerFunctions(inquirer,questions,employeeRepo,roleRepo,departmentRepo);

// departmentRepo.getDepartments()
//             .then((departments) => console.log({departments}))

// questions.updateQuestionChoiceLists().then((output) => {
//   console.log({output})
//   console.log("finished update")
//   console.log(questions.availableDepartments)
//   console.log(questions.availableRoles)
//   db.close()
// })

departmentRepo.createDepartment("blah")
    .then((result) => {
        console.log(result)
        db.close()
    })
    .catch((error) => { console.error(error) })



// employeeRepo.getEmployeeByID(1)
//     .then((employees) => {
//         console.table(employees)
//         db.close()
//     })
//     .catch((error) => { console.error(error) })

// employeeRepo.getManagerNamesAndTitles()
//     .then((managers) => {
//         console.table(managers)
//         db.close()
//     })
//     .catch((error) => { console.error(error) })
// let managerString = 'tony short: Infrastructure Manager'

// employeeRepo.getManagerByManagerString(managerString)
// .then((managers) => {
//   console.table(managers)
//   db.close()
// })
// .catch((error) => { console.error(error) })

// let roleName = 'Infrastructure Manager'

// roleRepo.getRoleByName(roleName)
// .then((role) => {
//   console.table(role)
//   db.close()
// })
// .catch((error) => { console.error(error) })

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