var mysql = require('mysql');
var Role = require("../model/role")

class roleRepositry {

    constructor(mySQLConnection) {
        this.connection = mySQLConnection;
        this.nextId = 0;
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