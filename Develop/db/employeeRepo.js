const Employee = require("../model/employee")

class employeeRepositry {

    constructor(db) {
        this.db = db; //this is an instance of mySQLDB 
    }

    getSelectAllQuery(){
        return `select * from employee`
    }

    getCreateQuery(employee){
        return `
        insert into employees
        (first_name,last_name,role_id,manager_id)
        values
        (${employee.firstName},${employee.lastName},${employee.role.id},${employee.manager.id})
        `   
    }

    getUpdateQuery(employee){
        return `
        update employees 
        set 
        first_name = ${employee.firstName},
        last_name = ${employee.lastName},
        role_id = ${employee.role.id},
        manager_id = ${employee.manager.id}
        where id = ${employee.id}`
    }

    getDeleteQuery(employee){
        return `
        delete from employees 
        where id = ${employee.id}`
    }

    async createEmployee(employee){
        return await this.db.query(this.getCreateQuery(employee))
        .then((result) => {
            {}
        })
        .catch((error) => {throw error})
    }

    createEmployeeObject(employeeData){
        const {id,first_name,last_name,role_id,manager_id} = employeeData
        return new Employee(id,first_name,last_name,role_id,manager_id);
    }

    async getEmployees(){
        //query the db and return an array of employee objects        
        return await this.db.query(this.getSelectAllQuery())
        .then(result => result.map(e => this.createEmployeeObject(e))) //get the db results and make employee instances from them
        .catch((error) => {throw error})
    }

    async updateEmployee(employee){
        return await this.db.query(this.getUpdateQuery(employee))
        .then((result) => {})
        .catch((error) => {throw error})
    }

    async deleteEmployee(){
        return await this.db.query(this.getDeleteQuery(employee))
        .then((result) => {})
        .catch((error) => {throw error})
    }

}

module.exports = employeeRepositry;