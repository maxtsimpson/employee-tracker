var mysql = require('mysql');
var Role = require("../model/role")

class roleRepositry {

    constructor(mySQLDB) {
        this.db = mySQLDB
    }
    getSelectAllQuery(){
        return "select * from `role`"
    }

    getRoleByIDQuery(id){
        return "select * from `role`" + `where id = ${id}`
    }

    getCreateQuery(role){
        return "insert into `role`" + 
        `
        (first_name,last_name,role_id,manager_id)
        values
        (${role.firstName},${role.lastName},${role.role.id},${role.manager.id})
        `   
    }

    getUpdateQuery(role){
        return "update `role`" +
        `
        set 
        title = ${role.title},
        salary = ${role.salary},
        deparment_id = ${role.deparment.id},
        where id = ${role.id}`
    }

    getDeleteQuery(role){
        return "delete from role" +
        `
        where id = ${role.id}`
    }

    async createRole(role){
        return await this.db.query(this.getCreateQuery(role))
        .then((result) => {
            {}
        })
        .catch((error) => {throw error})
    }

    createRoleObject(roleData){
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
        return await this.db.query(this.getRoleByIDQuery(id))
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