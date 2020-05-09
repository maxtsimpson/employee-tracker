var mysql = require('mysql');
var Deparment = require("../model/deparment")

class departmnetRepositry {

    constructor(mySQLConnection) {
        this.connection = mySQLConnection;
        this.nextId = 0;
    }

    async createDepartment(){

    }

    async getDepartments(){

    }

    async updateDepartment(){

    }

    async deleteDepartment(){

    }

}

module.exports = departmnetRepositry;