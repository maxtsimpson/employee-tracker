class Employee {

    constructor(id = null,firstName,lastName,role,manager){
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.role = role //this will be a role object
        this.manager = manager //this will be a manager object
    }

    toLongString(){
        let returnString = `
                id:         ${this.id}
                firstName:  ${this.firstName}
                lastName:   ${this.lastName}
                role:       ${this.role.title}
        `

        if(this.manager !== null && this.manager !== undefined){
            returnString += `
                manager:    ${this.manager.firstName} ${this.manager.lastName}
            `
        }

        return returnString
    }

    toShortString(){
        return `${this.firstName} ${this.lastName} : ${this.role.title}`
    }

}

module.exports = Employee;