class Employee {

    constructor(id,firstName,lastName,role,manager){
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.role = role //this will be a role object
        this.manager = manager //this will be a manager object
    }

}

module.exports = Employee;