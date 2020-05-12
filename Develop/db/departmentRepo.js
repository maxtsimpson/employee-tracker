var Department = require("../model/department")

class departmnetRepositry {

    constructor(db) {
        this.db = db; //this is an instance of mySQLDB 
    }

    getSelectAllQuery(){
        return `select * from department`
    }

    getDepartmentByIDQuery(id){
        return `select * from department where id = ${id}`
    }

    getCreateQuery(){
        return `
        insert into department
        (name)
        values
        (?)
        `   
    }

    getUpdateQuery(department){
        return `
        update department 
        set 
        name = ${department.name},
        where id = ${department.id}`
    }

    getDeleteQuery(department){
        return `
        delete from department 
        where id = ${department.id}`
    }

    async createDepartment(departmentName){
        return await this.db.query(this.getCreateQuery(),departmentName)
        // .then((result) => {
        //     {}
        // })
        .catch((error) => {throw error})
    }

    createDepartmentObject(departmentData){
        const {id,name} = departmentData
        return new Department(id,name);
    }

    async getDepartments(){
        //query the db and return an array of department objects        
        return await this.db.query(this.getSelectAllQuery())
        .then(result => result.map(d => this.createDepartmentObject(d))) //get the db results and make department instances from them
        .catch((error) => {throw error})
    }

    async getDepartmentByID(id){
        return await this.db.query(this.getDepartmentByIDQuery(id))
        .then(result => result.map(d => this.createDepartmentObject(d))[0]) //get the db results and make Department instances from them
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