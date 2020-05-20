const Employee = require("../model/employee")
const Role = require("../model/role")
const RoleRepo = require("./roleRepo")

class employeeRepositry {

    constructor(db, roleRepo) {
        this.db = db; //this is an instance of mySQLDB 
        this.roleRepo = roleRepo
    }

    getSelectAllQuery() {
        return `select * from employee`
    }

    getManagersQuery() {
        return `select * from manager`
    }

    getManagerByNameAndTitleQuery() {
        return `select * from manager 
                where first_name = ?
                and last_name = ?
                and title = ?`
    }

    getEmployeeByIDQuery() {
        return ` select * from employee where id = ? `
    }

    getCreateQuery() {
        return `
        insert into employee
        (first_name,last_name,role_id,manager_id)
        values
        (?,?,?,?)
        `
    }

    getUpdateQuery() {
        return `
        update employee 
        set 
        first_name = ?,
        last_name = ?,
        role_id = ?,
        manager_id = ?
        where id = ?`
    }


    getDeleteQuery() {
        return `
        delete from employee 
        where id = ?`
    }

    async createEmployee(firstName, lastName, role, manager) {
        // console.log(`in createEmployee 
        // firstName ${firstName} 
        // lastName ${lastName} 
        // role ${{role}} 
        // manager: ${manager}`)
        // console.log(typeof manager)
        // const thisMan = manager

        return await this.db.query(this.getCreateQuery(), [firstName, lastName, role.id, manager.id]) //create an employee and return the id it got assigned
            .then((result) => {
                // newEmployee.id = result.insertId
                // return newEmployee[0]
                return new Employee(result.insertId, firstName, lastName, role, manager)
            })
            .catch((error) => { throw error })
    }

    async getManagerAndRoleForEmployee(managerID, roleID) {
        let manager = null;
        if (managerID !== null) {
            manager = await this.getEmployeeByID(managerID)
                .catch((error) => console.error(error))
        }

        let role = null;
        if (roleID !== null) {
            role = await this.roleRepo.getRoleByID(roleID)
                .catch((error) => console.error(error))
        }

        return [manager, role]
    }

    async createEmployeeObject(employeeData) {
        const { id, first_name, last_name, role_id, manager_id } = employeeData;
        const [manager, role] = await this.getManagerAndRoleForEmployee(manager_id, role_id)
        return new Employee(id, first_name, last_name, role, manager)
    }

    async createManagerString(ManagerData) { //not currently used
        const { employeeID, first_name, last_name, title, salary } = ManagerData;
        return `${first_name} ${last_name}: ${title}`;
    }

    getManagerByNameAndTitleQuery() {
        return `select * from manager 
                where first_name = (?) 
                and last_name = (?) 
                and title = (?) 
                limit 1
                `
    }

    getEmployeeByNameAndTitleQuery() {
        return `select * 
                from employee 
                inner join 
                ?? as rl
                on employee.role_id = rl.id 
                where first_name = ? 
                and last_name = ?
                and rl.title = ? 
                limit 1
                `
    }

    async getEmployeeByEmployeeString(employeeString) {
        let [name, title] = employeeString.split(':')
        title = title.trimStart()
        let [first_name, last_name] = name.split(" ")

        return new Promise((resolve, reject) => {
            this.db.query(this.getEmployeeByNameAndTitleQuery(), ["role", first_name, last_name, title])
                .then((employeeList) => {
                    this.createEmployeeObject(employeeList[0])
                        .then((employee) => {
                            console.log(employee)
                            // console.log(values[0])
                            resolve(employee)
                        })
                        .catch((error) => {
                            console.log(error)
                            reject(error)
                        })
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    async getManagerByEmployeeString(managerString) {
        console.log("in getEmployeeByEmployeeString")
        let [name, title] = managerString.split(':')
        title = title.trimStart()
        let [first_name, last_name] = name.split(" ")

        return await this.db.query(this.getManagerByNameAndTitleQuery(), [first_name, last_name, title])
            .then((result) => Promise.all(result.map(m => this.getEmployeeByID(m.employeeID)))) //just return them as is
            .catch((error) => { throw error })
    }

    async getEmployees() {
        //query the db and return an array of employee objects        
        return await this.db.query(this.getSelectAllQuery())
            .then(result => Promise.all(result.map(e => this.createEmployeeObject(e)))) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async getEmployeesAsSummary() {
        //get employees and return them as an array of shortString summaries
        return await this.getEmployees()
            .then(result => result.map(e => e.toShortString())) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async getManagerNamesAndTitles() {
        //query the db and return an array of managers
        // console.log("in getManagerNamesAndTitles")        
        return await this.db.query(this.getManagersQuery()) //just return them as is
            .then(result => Promise.all(result.map(m => this.createManagerString(m))))
            .catch((error) => { throw error })
    }

    async getEmployeeByID(id) {
        // console.log(`in getEmployeeByID ID: ${id}`)
        return await this.db.query(this.getEmployeeByIDQuery(), id)
            .then(result => result.map(e => this.createEmployeeObject(e))[0]) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async updateEmployee(firstName, lastName, role, manager, id) {
        console.log("in updateEmployee id = " + id)
        return await this.db.query(this.getUpdateQuery(), [firstName, lastName, role.id, manager.id, id])
            .then((result) => {
                console.log({ result })
                return new Employee(id, firstName, lastName, role, manager)
            })
            .catch((error) => { throw error })
    }

    async deleteEmployee(employeeID) {
        return await this.db.query(this.getDeleteQuery(), employeeID)
            .then((result) => { })
            .catch((error) => { throw error })
    }

}

module.exports = employeeRepositry;