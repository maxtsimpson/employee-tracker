var mysql = require('mysql');
var MySQLDb = require('../db/mySqlDB')
var DepartmentRepo = require('../db/departmentRepo')

test("Can get departments from DepartmentRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const departmentRepo = new DepartmentRepo(db)

    departmentRepo.getDepartments()
        .then((departments) => {
            expect(typeof (departments)).toBe("object");
            console.table(departments)
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })


});

test("Can get an department by id from DepartmentRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const departmentRepo = new DepartmentRepo(db)

    departmentRepo.getDepartmentByID(1)
        .then((department) => {
            expect(typeof (department)).toBe("object");
            console.log({department})
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })
});

