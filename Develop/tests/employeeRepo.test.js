var mysql = require('mysql');
var MySQLDb = require('../db/mySqlDB')
var EmployeeRepo = require('../db/employeeRepo')

test("Can get employees from EmployeeRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const employeeRepo = new EmployeeRepo(db)

    employeeRepo.getEmployees()
        .then((employees) => {
            expect(typeof (employees)).toBe("object");
            console.table(employees)
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })


});

test("Can get an employee by id from EmployeeRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const employeeRepo = new EmployeeRepo(db)

    employeeRepo.getEmployeeByID(1)
        .then((employee) => {
            expect(typeof (employee)).toBe("object");
            console.log({employee})
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })
});

