var mysql = require('mysql');
var MySQLDb = require('../db/mySqlDB')
var RoleRepo = require('../db/roleRepo')

test("Can get roles from roleRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const roleRepo = new RoleRepo(db)

    roleRepo.getRoles()
        .then((roles) => {
            expect(typeof (roles)).toBe("object");
            console.table(roles)
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })


});

test("Can get an role by id from roleRepo instance", (done) => {
    const dbConfig = {
        host: "localhost",
        user: "root",
        database: "employeetracker",
        password: "ae92r4afe"
    }

    db = new MySQLDb(dbConfig)

    const roleRepo = new RoleRepo(db)

    roleRepo.getRoleByID(1)
        .then((role) => {
            expect(typeof (role)).toBe("object");
            console.log({role})
            db.close()
            done()
        })
        .catch((error) => { console.error(error) })
});

