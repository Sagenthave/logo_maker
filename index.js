const inquirer = require('inquirer');
const fs = require('fs');
class Logo {
  constructor() {
    this.text = '';
    this.shape = '';
  }
  render() {
    // Create the SVG markup based on the selected shape
    let svg = '';
    switch (this.shape) {
      case 'circle':
        svg = `<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="transparent" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24">${this.text}</text></svg>`;
        break;
      case 'square':
        svg = `<svg width="100" height="100"><rect x="10" y="10" width="80" height="80" stroke="black" stroke-width="3" fill="transparent" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24">${this.text}</text></svg>`;
        break;
      case 'triangle':
        svg = `<svg width="100" height="100"><polygon points="50,10 90,90 10,90" stroke="black" stroke-width="3" fill="transparent" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24">${this.text}</text></svg>`;
        break;
    }
    // Save the SVG markup to a file
    fs.writeFile('output.svg', svg, err => {
      if (err) {
        console.error('Error saving SVG file:', err);
      } else {
        console.log('SVG file created successfully!');
      }
    });
  }
}
// Questions for user input
const questions = [
  {
    message: 'Enter up to three characters',
    type: 'input',
    name: 'initials',
  },
  {
    message: 'What shape would you like?',
    type: 'list',
    name: 'shape',
    choices: ['triangle', 'square', 'circle'],
  },
  {
    message: 'What color would you like the shape to be?',
    type: 'list',
    name: 'shapeColor',
    choices: ['blue', 'pink', 'yellow', 'green', 'red', 'black'],
  },
  {
    message: 'What color would you like the text to be?',
    type: 'list',
    name: 'fontColor',
    choices: ['blue', 'pink', 'yellow', 'green', 'red', 'black'],
  },
];
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      console.error('Error saving SVG file:', err);
    } else {
      console.log('SVG file created successfully!');
    }
  });
}
function init() {
  inquirer
    .prompt(questions)
    .then(answers => {
      const logo = new Logo();
      logo.text = answers.initials;
      logo.shape = answers.shape;
      logo.render();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
init();