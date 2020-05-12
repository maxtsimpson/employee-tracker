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

    getEmployeeByIDQuery() {
        return `select * from employee where id = ?`
    }

    getCreateQuery() {
        return `
        insert into employees
        (first_name,last_name,role_id,manager_id)
        values
        (?,?,?,?)
        `
    }

    getUpdateQuery() {
        return `
        update employees 
        set 
        first_name = ?,
        last_name = ?,
        role_id = ?,
        manager_id = ?
        where id = ?`
    }

    getDeleteQuery() {
        return `
        delete from employees 
        where id = ?`
    }

    async createEmployee(firstName,lastName,role,manager) {
        let employee = new Employee(firstName,lastName,role,manager)
        return await this.db.query(this.getCreateQuery(),firstName,lastName,role.id,manager.id) //create an employee and return the id it got assigned
            .then((result) => {
                console.log({result})
                employee.id = result.id
                return employee
            })
            .catch((error) => { throw error })
    }

    async getManagerAndRoleForEmployee(managerID, roleID) {
        let manager
        if (managerID !== null) {
            manager = await this.getEmployeeByID(managerID)
                .catch((error) => console.error(error))
        } else {
            manager = null
        }

        let role
        if (role !== null) {
            role = await this.roleRepo.getRoleByID(roleID)
                .catch((error) => console.error(error))
        } else {
            role = null
        }
        return [manager, role]
    }

    async createEmployeeObject(employeeData) {
        const { id, first_name, last_name, role_id, manager_id } = employeeData;
        const [manager,role] = await this.getManagerAndRoleForEmployee(manager_id, role_id)
        return new Employee(id, first_name, last_name, role, manager)
    }

    async getEmployees() {
        //query the db and return an array of employee objects        
        return await this.db.query(this.getSelectAllQuery())
            .then(result => Promise.all(result.map(e => this.createEmployeeObject(e)))) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async getEmployeeByID(id) {
        return await this.db.query(this.getEmployeeByIDQuery(),id)
            .then(result => result.map(e => this.createEmployeeObject(e))[0]) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async updateEmployee(employee) {
        const {firstName,lastName,role,manager,id} = employee
        return await this.db.query(this.getUpdateQuery(),firstName,lastName,role.id,manager.id,id)
            .then((result) => { })
            .catch((error) => { throw error })
    }

    async deleteEmployee(employeeID) {
        return await this.db.query(this.getDeleteQuery(),employeeID)
            .then((result) => { })
            .catch((error) => { throw error })
    }

}

module.exports = employeeRepositry;