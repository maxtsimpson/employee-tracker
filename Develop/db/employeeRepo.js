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

    getEmployeeByIDQuery(id) {
        return `select * from employee where id = ${id}`
    }

    getCreateQuery(employee) {
        return `
        insert into employees
        (first_name,last_name,role_id,manager_id)
        values
        (${employee.firstName},${employee.lastName},${employee.role.id},${employee.manager.id})
        `
    }

    getUpdateQuery(employee) {
        return `
        update employees 
        set 
        first_name = ${employee.firstName},
        last_name = ${employee.lastName},
        role_id = ${employee.role.id},
        manager_id = ${employee.manager.id}
        where id = ${employee.id}`
    }

    getDeleteQuery(employee) {
        return `
        delete from employees 
        where id = ${employee.id}`
    }

    async createEmployee(firstName,lastName,role,manager) {
        let employee = new Employee(firstName,lastName,role,manager)
        return await this.db.query(this.getCreateQuery(),firstName,lastName,role,manager) //create an employee and return the id it got assigned
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
        return await this.db.query(this.getEmployeeByIDQuery(id))
            .then(result => result.map(e => this.createEmployeeObject(e))[0]) //get the db results and make employee instances from them
            .catch((error) => { throw error })
    }

    async updateEmployee(employee) {
        return await this.db.query(this.getUpdateQuery(employee))
            .then((result) => { })
            .catch((error) => { throw error })
    }

    async deleteEmployee() {
        return await this.db.query(this.getDeleteQuery(employee))
            .then((result) => { })
            .catch((error) => { throw error })
    }

}

module.exports = employeeRepositry;