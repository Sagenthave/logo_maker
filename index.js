const inquirer = require('inquirer');
const fs = require('fs');

class Shapes {
    constructor (colour) {
        this.colour = colour;
    }
    getColour (userColour) {
        this.colour = userColour
    }
}


function getColorCode(colorName) {
  switch (colorName) {
    case 'blue':
      return '#0000FF';
    case 'pink':
      return '#FFC0CB';
    case 'yellow':
      return '#FFFF00';
    case 'green':
      return '#008000';
    case 'red':
      return '#FF0000';
    case 'black':
      return '#000000';
  }
}

class Logo {
  constructor() {
    this.text = '';
    this.shape = '';
    this.shapeColor = '';
    this.fontColor = '';
  }
  render() {
    const shapeColorCode = getColorCode(this.shapeColor);
    const fontColorCode = getColorCode(this.fontColor);
    // Create the SVG markup based on the selected shape
    let svg = '';
    switch (this.shape) {
      case 'circle':
        svg = `<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="${shapeColorCode}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="${fontColorCode}">${this.text}</text>
        </svg>`;
        break;
      case 'square':
        svg = `<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
          <rect x="10" y="10" width="80" height="80" stroke="black" stroke-width="3" fill="${shapeColorCode}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="${fontColorCode}">${this.text}</text>
        </svg>`;
        break;
      case 'triangle':
        svg = `<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
          <polygon points="50,10 90,90 10,90" stroke="black" stroke-width="3" fill="${shapeColorCode}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="${fontColorCode}">${this.text}</text>
        </svg>`;
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
    message: 'Enter only up to three characters',
    type: 'input',
    name: 'initials',
    validate: (initials) => 
        initials.length <= 3 || "ERROR. Please only put up to 3 characters"
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
function generateSvg() {
  inquirer
    .prompt(questions)
    .then(answers => {
        // let shape = new Circle();
        // shape.getColour(answers.shapeColor)
        // console.log(shape)
        // TRY TO FIGURE OUT HOW TO PASS TEST AND ADD SHAPE CLASSES
      const logo = new Logo();
      logo.text = answers.initials;
      logo.shape = answers.shape;
      logo.fontColor = answers.fontColor;
      logo.shapeColor = answers.shapeColor;
      logo.render();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
generateSvg();