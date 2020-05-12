class AnswerFunctions {
    //use a class because the function syntax is easier
    //and maybe it will need properties later
    constructor(inquirer,questions,employeeRepo,roleRepo,departmentRepo){
        this.inquirer = inquirer
        this.questions = questions
        this.employeeRepo = employeeRepo
        this.departmentRepo = departmentRepo
        this.roleRepo = roleRepo
    }
    
    addAnEmployee(){
        console.log("in addAnEmployee")
        this.questions.updateQuestionChoiceLists()
        this.inquirer.prompt(this.questions.addAnEmployee).then(answers => {
            //assume the answers have been validated
            let [firstName,lastName,role,manager] = answers
            this.employeeRepo.createEmployee(firstName,lastName,role,manager).then(
                (employee) => {
                    // console.log({results})
                    console.log("employee added successfully!")
                    console.table(employee)
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })
    }

    addARole(){
        console.log("in addARole")
        this.inquirer.prompt(this.questions.addARole).then(answers => {
            this.departmentRepo.createDepartment(answers.departmentName).then(
                (results) => {
                    // console.log({results})
                    console.log("department added successfully!")
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })
    }

    addADepartment(){
        // console.log("in addADepartment")
        this.inquirer.prompt(this.questions.addADepartmentQuestions).then(answers => {
            this.departmentRepo.createDepartment(answers.departmentName).then(
                (results) => {
                    // console.log({results})
                    console.log("department added successfully!")
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })

    }

    viewAnEmployee(){
        console.log("in viewAnEmployee")
        this.inquirer.prompt(this.questions.viewAnEmployee).then(answers => {
            this.departmentRepo.createDepartment(answers.departmentName).then(
                (results) => {
                    // console.log({results})
                    console.log("department added successfully!")
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })

    }

    viewARole(){
        console.log("in viewARole")
        this.inquirer.prompt(this.questions.viewARole).then(answers => {
            this.departmentRepo.createDepartment(answers.departmentName).then(
                (results) => {
                    // console.log({results})
                    console.log("department added successfully!")
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })
    }

    updateAnEmployee(){
        console.log("in updateAnEmployee")
        this.inquirer.prompt(this.questions.updateAnEmployee).then(answers => {
            this.departmentRepo.createDepartment(answers.departmentName).then(
                (results) => {
                    // console.log({results})
                    console.log("department added successfully!")
                    this.returnToMainMenu()
                }
            )
            .catch((error) => {throw error})
        })
    }

    exitTheApp(){
        // a little rough. but works like a charm!
        process.exit()
    }

    returnToMainMenu(){
        this.inquirer.prompt(this.questions.initialPrompt).then(answers => {
            this[answers.mainMenu]()
        });
    }
}

module.exports = AnswerFunctions