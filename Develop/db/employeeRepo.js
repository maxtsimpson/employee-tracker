var mysql = require('mysql');
var Employee = require("../model/employee")

class employeeRepositry {

    constructor(mySQLConnection) {
        this.connection = mySQLConnection;
        this.nextId = 0;
    }

    async createEmployee(){

    }

    async getEmployees(){

    }

    async updateEmployee(){

    }

    async deleteEmployee(){

    }

}

module.exports = employeeRepositry;