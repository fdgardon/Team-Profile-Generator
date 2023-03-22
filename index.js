const inquirer = require("inquirer");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const Manager = require("./lib/manager");
const generateHtmlFile = require("./src/index.html");
const fs = require("fs");
const employee= []

askAddingTeam()

function askAddingTeam(){
  inquirer.prompt(
    
      {
        type: "list",
        name: "option",
        message: "Please add from the below list in your team!",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "My Team is Completed!"]
      })
      
      .then(function(answers) {
        if (answers.option === 'Manager'){
          inquirer.prompt([
            {
              type: 'input',
              name: 'name',
              message: "What is the manager's name?"
            },
            {
              type: "input",
              name: "id",
              message: "What is the Manager ID?"
            },
            {
              type: "input",
              name: "officenumber",
              message: "What is the Manager Office number?"
            },
            {
              type: "input",
              name: "email",
              message: "What is the manager Email address?"
            },
          ])
          .then(function (answers){
            const AddManager = new Manager(answers.name, answers.id, answers.officenumber, answers.email);
            employee.push(AddManager);

            askAddingTeam();
          });
        } else if (answers.option === 'Engineer'){
          inquirer.prompt(
          [
            {
              type: "input",
                name: "name",
                      message: "What is the Engineer name?"
                    },
                    {
                      type: "input",
                      name: "id",
                      message: "What is the Engineer ID?"
                    },
                    {
                      type: "input",
                      name: "gitHub",
                      message: "What is the Engineer GitHub address?"
                    },
                    {
                      type: "input",
                      name: "email",
                      message: "What is the Engineer Email address?"
                    },
          ]).then(function (answers) {
            const AddEngineer = new Engineer(answers.name, answers.id, answers.gitHub, answers.email);
            employee.push(AddEngineer);

            askAddingTeam();
          });
        } else if (answers.option === 'Intern') {
          inquirer.prompt(
            [
              {
                        type: "input",
                        name: "name",
                        message: "What is the intern name?"
                      },
                      {
                        type: "input",
                        name: "id",
                        message: "What is the intern ID?"
                      },
                      {
                        type: "input",
                        name: "school",
                        message: "What is the intern school?"
                      },
                      {
                        type: "input",
                        name: "email",
                        message: "What is the intern Email address?"
                      },
            ])
            
            .then (function (answers){
              const AddIntern = new Intern(answers.name, answers.id, answers.school, answers.email)
              employee.push(AddIntern);

              askAddingTeam();
            });
          
        } else if (answers.option=== 'My Team is Completed!'){
          const generateHTML = generateHtmlFile(employee);
          fs.writeFile('MyTeam.html', generateHTML, function (err){
            if (err) throw err

            console.log("HTML File is created")
          });
        }
       })
  
};



