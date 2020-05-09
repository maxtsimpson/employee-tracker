var mysql = require('mysql');
var Role = require("../model/role")

class roleRepositry {

    constructor(mySQLConnection) {
        this.connection = mySQLConnection;

        this.createQuery = ``
        this.selectAllQuery = ``
        this.updateQuery = ``
        this.deleteQuery = ``
    }

    async createRole(){

    }

    async getRoles(){

    }

    async updateRole(){

    }

    async deleteRole(){

    }

}

module.exports = roleRepositry;