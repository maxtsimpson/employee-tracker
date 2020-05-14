class AnswerFunctions {
    //use a class because the function syntax is easier
    //and maybe it will need properties later
    constructor(inquirer, questions, employeeRepo, roleRepo, departmentRepo) {
        this.inquirer = inquirer
        this.questions = questions
        this.employeeRepo = employeeRepo
        this.departmentRepo = departmentRepo
        this.roleRepo = roleRepo
    }

    addAnEmployee() {
        this.questions.updateQuestionChoiceLists().then(() => {
            this.inquirer.prompt(this.questions.addAnEmployeeQuestions).then(answers => {
                //assume the answers have been validated
                let { firstName, lastName, roleName, managerString } = answers

                Promise.all([
                    this.employeeRepo.getManagerByManagerString(managerString),
                    this.roleRepo.getRoleByName(roleName)
                ])
                    .then((output) => {
                        console.log("in output")
                        let [manager, role] = output
                        this.employeeRepo.createEmployee(firstName, lastName, role, manager)
                            .then((newEmployee) => {
                                console.log("employee added successfully!")
                                console.log(newEmployee.toString())
                                this.returnToMainMenu()
                            }
                            )
                            .catch((error) => { throw error })
                    })
                    .catch((error) => { throw error })
            })
        })

    }

    addARole() {
        this.questions.updateQuestionChoiceLists().then(() => {
            this.inquirer.prompt(this.questions.addARoleQuestions).then(answers => {
                this.roleRepo.createRole(answers.roleTitle,answers.roleSalary,answers.roleDepartmentName).then(
                    (results) => {
                        console.log({results})
                        console.log("role added successfully!")
                        this.returnToMainMenu()
                    }
                )
                    .catch((error) => { throw error })
            })
        })
    }

    addADepartment() {
        // console.log("in addADepartment")
        this.questions.updateQuestionChoiceLists().then(() => {
            this.inquirer.prompt(this.questions.addADepartmentQuestions).then(answers => {
                this.departmentRepo.createDepartment(answers.departmentName).then(
                    (results) => {
                        // console.log({results})
                        console.log("department added successfully!")
                        this.returnToMainMenu()
                    }
                )
                    .catch((error) => { throw error })
            })
        })

    }

    // updateAnEmployee() {
    //     console.log("in updateAnEmployee")
    //     this.inquirer.prompt(this.questions.updateAnEmployee).then(answers => {
    //         this.departmentRepo.createDepartment(answers.departmentName).then(
    //             (results) => {
    //                 // console.log({results})
    //                 console.log("department added successfully!")
    //                 this.returnToMainMenu()
    //             }
    //         )
    //             .catch((error) => { throw error })
    //     })
    // }

    viewDepartments() {
        this.departmentRepo.getDepartments().then(
            (departments) => {
                console.table(departments)
                this.returnToMainMenu()
            }
        )
            .catch((error) => { throw error })
    }

    viewEmployees() {
        this.employeeRepo.getEmployees().then(
            (employees) => {
                console.table(employees)
                this.returnToMainMenu()
            }
        )
            .catch((error) => { throw error })
    }

    viewRoles() {
        this.roleRepo.getRoles().then(
            (roles) => {
                console.table(roles)
                this.returnToMainMenu()
            }
        )
            .catch((error) => { throw error })
    }

    exitTheApp() {
        // a little rough. but works like a charm!
        process.exit()
    }

    returnToMainMenu() {
        this.inquirer.prompt(this.questions.initialPrompt).then(answers => {
            this[answers.mainMenu]()
        });
    }
}

module.exports = AnswerFunctions