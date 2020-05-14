var Department = require("../model/department")

class departmnetRepositry {

    constructor(db) {
        this.db = db; //this is an instance of mySQLDB 
    }

    getSelectAllQuery(){
        return `select * from department`
    }

    getDepartmentByIDQuery(){
        return `select * from department where id = ?`
    }

    getDepartmentByNameQuery(){
        return `select * from department where name = ? limit 1`
    }

    getCreateQuery(){
        return `
        insert into department
        (??)
        values
        (?)
        `   
    }

    getUpdateQuery(){
        return `
        update department 
        set 
        name = ?,
        where id = ?`
    }

    getDeleteQuery(){
        return `
        delete from department 
        where id = ?`
    }

    async createDepartment(departmentName){
        return await this.db.query(this.getCreateQuery(),["name",departmentName])
        .then((result) => {
            console.log({result})
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
        .then(result => result.map(d => this.createDepartmentObject(d))) //get the db results and make department instances from them
        .catch((error) => {throw error})
    }

    async getDepartmentByID(id){
        return await this.db.query(this.getDepartmentByIDQuery(),id)
        .then(result => result.map(d => this.createDepartmentObject(d))[0]) //get the db results and make Department instances from them
        .catch((error) => {throw error})
    }

    async getDepartmentByName(name){
        return await this.db.query(this.getDepartmentByNameQuery(),name)
        .then(result => result.map(d => this.createDepartmentObject(d))[0]) //get the db results and make Department instances from them
        .catch((error) => {throw error})
    }

    async updateDepartment(department){
        return await this.db.query(this.getUpdateQuery(),department)
        .then((result) => {})
        .catch((error) => {throw error})
    }

    async deleteDepartment(){
        return await this.db.query(this.getDeleteQuery(),department.id)
        .then((result) => {})
        .catch((error) => {throw error})
    }

}

module.exports = departmnetRepositry;