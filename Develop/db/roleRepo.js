var mysql = require('mysql');
var Role = require("../model/role")

class roleRepositry {

    constructor(mySQLDB,departmentRepo) {
        this.db = mySQLDB
        this.departmentRepo = departmentRepo
    }
    getSelectAllQuery(){
        return "select * from ??"
    }

    getRoleByIDQuery(){
        return "select * from ?? where id = ?"
    }

    getRoleByTitleQuery(){
        return "select * from ?? where title = ?"
    }

    getCreateQuery(){
        return `insert into ??
        (title,salary,department_id)
        values
        (?,?,?)
        `
    }

    getUpdateQuery(){
        return `update ??
        set 
        title = ?,
        salary = ?,
        department_id = ?,
        where id = ?`
    }

    getDeleteQuery(){
        return `
        delete from ??
        where id = ?`
    }


    async createRole(title,salary,departmentName){
        let department = await this.departmentRepo.getDepartmentByName(departmentName)
        console.log({department})
        let role = new Role(null,title,salary,department) //this.departmentRepo.getDepartmentByName(departmentName)
        console.log(role)
        return await this.db.query(this.getCreateQuery(),["role",role.title,role.salary,role.department.id]) //create a role and return the id it got assigned
            .then((result) => {
                console.log({result})
                role.id = result.id
                return role
            })
            .catch((error) => { throw error })
    }

    createRoleObject(roleData){
        // console.log("in createRoleObject")
        const {id,title,salary,deparmtent_id} = roleData
        return new Role(id,title,salary,deparmtent_id);
    }

    async getRoles(){
        //query the db and return an array of role objects        
        return await this.db.query(this.getSelectAllQuery(),["role"])
        .then(result => result.map(e => this.createRoleObject(e))) //get the db results and make role instances from them
        .catch((error) => {throw error})
    }

    async getRoleByID(id){
        // console.log("in getRoleByID. id: " + id)
        return await this.db.query(this.getRoleByIDQuery(),["role",id])
        .then(result => result.map(e => this.createRoleObject(e))[0]) //get the db results and make Role instances from them
        .catch((error) => {throw error})
    }

    async getRoleByName(roleName){
        return await this.db.query(this.getRoleByTitleQuery(),["role",roleName])
        .then(result => result.map(e => this.createRoleObject(e))[0]) //get the db results and make Role instances from them
        .catch((error) => {throw error})
    }

    async updateRole(role){
        return await this.db.query(this.getUpdateQuery(role))
        .then((result) => {})
        .catch((error) => {throw error})
    }

    async deleteRole(){
        return await this.db.query(this.getDeleteQuery(role))
        .then((result) => {})
        .catch((error) => {throw error})
    }

}

module.exports = roleRepositry;