var Deparment = require("../model/department")

class departmnetRepositry {

    constructor(db) {
        this.db = db; //this is an instance of mySQLDB 
    }

    getSelectAllQuery(){
        return `select * from department`
    }

    getCreateQuery(department){
        return `
        insert into departments
        (name)
        values
        (${department.name})
        `   
    }

    getUpdateQuery(department){
        return `
        update departments 
        set 
        name = ${department.name},
        where id = ${department.id}`
    }

    getDeleteQuery(department){
        return `
        delete from departments 
        where id = ${department.id}`
    }

    async createDepartment(department){
        return await this.db.query(this.getCreateQuery(department))
        .then((result) => {
            {}
        })
        .catch((error) => {throw error})
    }

    createDepartmentObject(departmentData){
        const {id,name} = departmentData
        return new Department(id,name);
    }

    async getDepartments(){
        //query the db and return an array of department objects        
        return await this.db.query(this.getSelectAllQuery())
        .then(result => result.map(e => this.createDepartmentObject(e))) //get the db results and make department instances from them
        .catch((error) => {throw error})
    }

    async updateDepartment(department){
        return await this.db.query(this.getUpdateQuery(department))
        .then((result) => {})
        .catch((error) => {throw error})
    }

    async deleteDepartment(){
        return await this.db.query(this.getDeleteQuery(department))
        .then((result) => {})
        .catch((error) => {throw error})
    }

}

module.exports = departmnetRepositry;