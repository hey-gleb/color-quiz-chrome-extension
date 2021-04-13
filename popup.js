let buttons;
let backgroundElement;
let buttonNumberWithCorrectValue;
let correctInARow = 0;
let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

document.addEventListener('DOMContentLoaded', () => {
    backgroundElement = document.getElementById('background');
    buttons = [
        document.getElementById('button-0'),
        document.getElementById('button-1'),
        document.getElementById('button-2'),
        document.getElementById('button-3')
    ];
    setInitSetup();

    buttons.forEach(button => {
        button.onclick = buttonClickHandler;
    })
});

/**
 * Initial setup function
 */
const setInitSetup = () => {
    updateButtonValues();
}

/**
 * 
 * @param {ButtonClickEvent} event - button click event 
 */
const buttonClickHandler = (event) => {
    const result = event.target.innerText === rgbToHex(backgroundElement.style.backgroundColor)
    result ? correctInARow++ : correctInARow = 0;
    showResult();
    setTimeout(() => {
        resetButtonColors();
        updateButtonValues();
    }, 700);
}

/**
 * Function to update button values
 */
const updateButtonValues = () => {
    buttonNumberWithCorrectValue = generateRandomInt(4);
    const correctColor = generateHex();
    for (let i of Array(4).keys()) {
        i === buttonNumberWithCorrectValue
            ? buttons[i].innerText = correctColor
            : buttons[i].innerText = generateHex();
    }
    updateBackgroundColor(correctColor);
}

/**
 * Function to update background color
 * @param {string} color - new background color
 */
const updateBackgroundColor = (color) => {
    backgroundElement.style.backgroundColor = color;
}

/**
 * Function to show correct and incorrect answers
 */
const showResult = () => {
    correctInARow > 1
        ? document.getElementById('result-phrase').style.visibility = 'visible'
        : document.getElementById('result-phrase').style.visibility = 'hidden';
    document.getElementById('result').innerText = correctInARow;
    buttons.forEach((button, index) => {
        if (index === buttonNumberWithCorrectValue) {
            button.style.backgroundColor = '#33CC00';
            button.classList.add('rotate-button');
            setTimeout(() => {
                button.classList.remove('rotate-button');
            }, 700)
            return;
        }
        button.style.backgroundColor = '#FF0000';
    })
}

/**
 * Utility function to reset button background color
 */
const resetButtonColors = () => {
    buttons.forEach((button) => {
        button.style.backgroundColor = 'darkgray';
    })
}

/**
 * Utility function to generate random hex color value
 */
const generateHex = () => {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

/**
 * Utility function to generate random number
 * @param {number} max - upper limit for random number
 */
const generateRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

/**
 * Utility function to convert rgb color line into hex
 * @param {string} rgb - rgb color value 
 */
const rgbToHex = (rgb) => {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]).toUpperCase();
}

/**
 * Utility function to convert decimal numbers into hex
 * @param {number} x - decimal number
 */
const hex = (x) => {
    return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}