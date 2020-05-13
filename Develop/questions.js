const helpers = require("./helpers")

class questions {

    constructor(departmentRepo, roleRepo, employeeRepo) {
        this.availableManagers = []
        this.availableRoles = []
        this.employeeRepo = employeeRepo;
        this.departmentRepo = departmentRepo;
        this.roleRepo = roleRepo;

        this.initialPrompt = [
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: ['Add a department',
                    'Add an employee',
                    'Add a role',
                    'View departments',
                    'View employees',
                    'View roles',
                    'Update an Employee',
                    'exit the app'],
                filter: (val) => this.toFunctionName(val)
            }
        ]
        this.addAnEmployeeQuestions = [
            {
                type: 'input',
                name: 'firstName',
                message: 'enter the employees first name',
                validate: function (value) {
                    var valid = (typeof value === "string");
                    return valid || 'Please enter a string';
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'enter the employees last name',
                validate: function (value) {
                    var valid = (typeof value === "string");
                    return valid || 'Please enter a string';
                }
            }
            // },
            // {
            //     type: 'list',
            //     name: 'role',
            //     message: 'please select their role',
            //     choices: this.availableRoles
            //     // choices: this.availableRoles
            // },
            // {
            //     type: 'list',
            //     name: 'deparment',
            //     message: 'please select their manager',
            //     choices: this.availableManagers
            // }
        ]
        this.addARoleQuestions = [
            {}
        ]
        this.addADepartmentQuestions = [
            {
                type: 'input',
                name: 'departmentName',
                message: 'Whats the name of the department?',
                validate: function (value) {
                    var valid = (typeof value === "string");
                    return valid || 'Please enter a string';
                }
            }
        ]
        this.viewAnEmployeeQuestions = [
            {}
        ]
        this.viewARoleQuestions = [
            {}
        ]
        this.updateAnEmployeeQuestions = [
            {}
        ]
    }

    toFunctionName(phrase) {
        //change the phrase to camel case
        let functionName = phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        //change the first letter of the first word to lowercase and join the whole string together to remove spaces
        functionName = functionName[0].charAt(0).toLowerCase() + functionName.slice(1).split(" ").join("")

        return functionName;
    };

    async updateQuestionChoiceLists() {
        // console.log("in updateQuestionChoiceLists")
        return await Promise.all(
            [this.employeeRepo.getManagerNamesAndTitles()
                , this.roleRepo.getRoles()]
        ).then((output) => {
            let [managers, roles] = output
            this.availableManagers = managers
            this.availableRoles = roles.map(r => r.title)
            // console.log(this.availableRoles[0])
            // console.log(this.availableManagers[0])
            // console.table(this.availableRoles)
            // console.table(this.availableManagers)

            this.addAnEmployeeQuestions.push(
                {
                    type: 'list',
                    name: 'roleName',
                    message: 'please select their role',
                    choices: this.availableRoles
                },
                {
                    type: 'list',
                    name: 'managerString',
                    message: 'please select their manager',
                    choices: this.availableManagers
                }
            )
        })
    }

}

module.exports = questions;