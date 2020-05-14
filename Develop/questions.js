const _ = require('lodash');

class questions {

    constructor(departmentRepo, roleRepo, employeeRepo) {
        this.availableManagers = []
        this.availableRoles = []
        this.availableDepartments = []
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
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Whats the title of the role?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Whats the salary of the role?',
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                }
            }
        ]
        this.addADepartmentQuestions = [
            // {
            //     type: 'list',
            //     name: 'departmentName',
            //     message: 'Whats the name of the department?',
            //     validate: function (value) {
            //         var valid = !(this.availableDepartments.includes(value));
            //         return valid || 'Please enter a department that doesnt already exist';
            //     }
            // }
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

        //this is because inquirer doesnt seem to use the this properties at the time you use the question
        //so need to add the questions that refer to arrays just before you want to use them

        return await Promise.all(
            [this.employeeRepo.getManagerNamesAndTitles()
                , this.roleRepo.getRoles()
                , this.departmentRepo.getDepartments()]
        ).then((output) => {
            let [managers, roles, departments] = output
            this.availableManagers = managers
            this.availableRoles = roles.map(r => r.title)
            this.availableDepartments = departments.map(d => d.name)

            this.addAnEmployeeQuestions = _.remove(this.addAnEmployeeQuestions, (q => (q.name === 'roleName' || q.name === 'managerString'))) //lodash. it should work
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

            this.addADepartmentQuestions = []
            this.addADepartmentQuestions.push({
                type: 'input',
                name: 'departmentName',
                message: 'Whats the name of the department?',
                validate: (value) => {
                    return this.departmentDoesntAlreadyExist(value) || 'department name already exists'
                }
            })

            // this.addARoleQuestions = _.remove(this.addARoleQuestions, (q => q.name === 'departmentName')) //lodash. it should work
            this.addARoleQuestions.push(
                {
                    type: 'list',
                    name: 'roleDepartmentName',
                    message: 'please select their deparment',
                    choices: this.availableDepartments
                }
            )
        })
    }

    departmentDoesntAlreadyExist(departmentName) {
        // console.log("in departmentDoesntAlreadyExist")
        return !(this.availableDepartments.includes(departmentName))
    }

}

module.exports = questions;