var mysql = require('mysql');
var Role = require("../model/role")

class roleRepositry {

    constructor(mySQLDB) {
        this.db = mySQLDB
    }
    getSelectAllQuery(){
        return "select * from `role`"
    }

    getRoleByIDQuery(){
        return "select * from `role` where id = ?"
    }

    getRoleByTitleQuery(){
        return "select * from `role` where title = ?"
    }

    getCreateQuery(role){
        return `insert into ??
        (first_name,last_name,role_id,manager_id)
        values
        (?,?,?)
        `
    }

    getUpdateQuery(role){
        return `update ??
        set 
        title = ?,
        salary = ?,
        deparment_id = ?,
        where id = ?`
    }

    getDeleteQuery(role){
        return `
        delete from ??
        where id = ?`
    }


    getCreateQuery(){
        return `insert into ??
        (title,salary,deparment)
        values
        (?,?,?)
        `   
    }

    async createRole(title,salary,deparment){
        let role = new Employee(firstName,lastName,role,manager)
        return await this.db.query(this.getCreateQuery(),["role",role.title,role.salary,role.deparment.id]) //create a role and return the id it got assigned
            .then((result) => {
                console.log({result})
                .id = result.id
                return employee
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
        return await this.db.query(this.getSelectAllQuery())
        .then(result => result.map(e => this.createRoleObject(e))) //get the db results and make role instances from them
        .catch((error) => {throw error})
    }

    async getRoleByID(id){
        // console.log("in getRoleByID. id: " + id)
        return await this.db.query(this.getRoleByIDQuery(),id)
        .then(result => result.map(e => this.createRoleObject(e))[0]) //get the db results and make Role instances from them
        .catch((error) => {throw error})
    }

    async getRoleByName(roleName){
        return await this.db.query(this.getRoleByTitleQuery(),roleName)
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