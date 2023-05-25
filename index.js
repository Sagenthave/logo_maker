const inquirer = require('inquirer');
// import inquirer from "inquirer";

// Questions for user input 
const questions = [
    {
        message: 'Enter up to three characters',
        type: 'input',
        name: 'initials',
    },
    {
        message: 'What shape would you like?',
        type: 'checkbox',
        name: 'shapes',
        choices: ['triange', 'square', 'circle'],
    },
    {
        message: 'What colour would you like the shape to be?',
        type: 'checkbox',
        name: 'shape-colour',
        choices: ['blue', 'pink', 'yellow', 'green', 'red', 'black'],
    },
    {
        message: 'What colour would you like the text?',
        type: 'checkbox',
        name: 'text-colour',
        choices: ['blue', 'pink', 'yellow', 'green', 'red', 'black'],
    }
]

function writeToFile(fileName, data) {
    // console.log ("write to file", data) //console logging what the function is receiving
    fs.writeFile(fileName, data, (err) => 
    err ? console.log(err) : console.log('Successfully created SVG'))
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function (responsesArr) {
        writeToFile("example.svg", generateMarkdown(responsesArr)) 
    })

};

// Function call to initialize app
init();

function generateSVG() {
    inquirer.prompt(questions).then(answers => {
        console.log(answers)})
}

generateSVG();