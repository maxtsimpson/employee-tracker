var mysql = require('mysql');
var MySQLDb = require('../db/mySqlDB')
var EmployeeRepo = require('../db/employeeRepo')
var RoleRepo = require('../db/roleRepo')

test("can create employee", (done) => {
    const employeeData = { id: 1, first_name: "sam", last_name: "wayne", role_id: 1, manager_id: 1 }
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const roleRepo = new RoleRepo(db)
    const employeeRepo = new EmployeeRepo(db)

    employeeRepo.createEmployeeObject(employeeData)
    .then((employee) => {
        expect(typeof (employee)).toBe("object");
        console.log({employee})
        db.close()
        done()
    })
    .catch((error) => { console.error(error) })
})

// test("Can get employees from EmployeeRepo instance", (done) => {
//     const dbConfig = {
//         host: "localhost",
//         user: "root",
//         database: "employeetracker",
//         password: "ae92r4afe"
//     }

//     db = new MySQLDb(dbConfig)

//     const roleRepo = new RoleRepo(db)
//     const employeeRepo = new EmployeeRepo(db)

//     employeeRepo.getEmployees()
//         .then((employees) => {
//             expect(typeof (employees)).toBe("object");
//             console.table(employees)
//             db.close()
//             done()
//         })
//         .catch((error) => { console.error(error) })


// });

// test("Can get an employee by id from EmployeeRepo instance", (done) => {
//     const dbConfig = {
//         host: "localhost",
//         user: "root",
//         database: "employeetracker",
//         password: "ae92r4afe"
//     }

//     db = new MySQLDb(dbConfig)

//     const roleRepo = new RoleRepo(db)
//     const employeeRepo = new EmployeeRepo(db)

//     employeeRepo.getEmployeeByID(1)
//         .then((employee) => {
//             expect(typeof (employee)).toBe("object");
//             console.log({ employee })
//             db.close()
//             done()
//         })
//         .catch((error) => { console.error(error) })
// });

