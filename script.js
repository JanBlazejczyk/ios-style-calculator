// functions for basic math operations
const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if (b !== 0) {
        return a / b;
    }
    else {
        return "Can't divide by 0!"
    }
}

const getPercent = (a) => {
    return a / 100;
}

const changeSign = (a) => {
    if (a >= 0) {
        return -a;
    }
    else {
        return a;
    }
}

// function for performing an operation
// takes two numbers and an operator (str)
// returns the result of the operation
const operate = (a, operator, b) => {
    if (operator === "+") {
        return add(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "*") {
        return multiply(a, b);
    }
    else if (operator === "/") {
        return divide(a, b);
    }
}

// function to switch a string to a number
const stringToNumber = (string) => {
    // convert string to list
    const numberArray = string.split("");
    // use filter to remove the spaces
    const numberArrayNoSpaces = numberArray.filter(char => char !== " ");
    // replace the comma with a dot
    for (i = 0; i < numberArrayNoSpaces.length; i++) {
        if (numberArrayNoSpaces[i] === ",") {
            numberArrayNoSpaces[i] = ".";
        }
    }
    // convert the list to string again
    const numberString = numberArrayNoSpaces.join("");
    // use Number() method on the legal string
    const finalNumber = Number(numberString);
    return finalNumber
}

// DISPLAY FUNCTIONALITY - clicking digit buttons, comma and minus, displays numbers and decimals on the screen
// comma can appear on the screen only once, and when there is already some number
const commaButton = document.querySelector(".comma");
let isDecimal = false;

commaButton.addEventListener("click", () => {
    if (inputField.innerHTML !== "0" && isDecimal === false) {
        isDecimal = true;
        inputField.insertAdjacentHTML("beforeend", commaButton.innerHTML);
    }
})

// when the +/- button is clicked
// if the number is positive the minus sign appears at the beggining of the number
// if the number is negative the minus sign disappears from the beggining of the number
const plusMinusButton = document.querySelector("#btn-plus-minus");
const minusField = document.querySelector(".minus-input-field")
let isNegative = false;

plusMinusButton.addEventListener("click", () => {
    if (isNegative === false) {
        minusField.insertAdjacentHTML("beforeend", "-");
        isNegative = true;
    } else {
        minusField.innerHTML = "";
        isNegative = false;
    }

})

// for each digit button add an event listener for clicking the button
// that will handle displaying digits on the screen with spaces in the correct places
const digitButtons = document.querySelectorAll(".digit");
const inputField = document.querySelector(".digit-input-field");
let numberOfDigits = 1;

digitButtons.forEach((digitButton) => digitButton.addEventListener("click", () => {
    // when a digit button is pressed all operator buttons must appear off
    operatorButtons.forEach((operatorButton) => {
        operatorButton.classList.remove("orange-btn-operator-on");
    })

    // jeśli newNum === true kolejna kliknięta liczba musi się stać wyświetlaczem 
    // newNum musi wtedy sie stac false i wszystko inne iść swoim torem
    if (newNum === true || inputField.innerHTML === "0") {
        inputField.innerHTML = digitButton.innerHTML;
        // we just started a new number and this will be false until any operator is pressed again
        newNum = false;

        // new number is not a deciaml at the beggining
        isDecimal = false;
        numberOfDigits += 1;
    }
    // some number is already in
    else {
        if (isDecimal === false) {
            if (numberOfDigits === 5) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + " " + inputField.innerHTML.slice(2);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 6) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 7) {
                inputField.classList.remove("input-field");
                inputField.classList.add("input-field-smaller");
                minusField.classList.remove("minus-input-field");
                minusField.classList.add("minus-input-field-smaller");
                let spacedInput = inputField.innerHTML.slice(0, 1) + " " + inputField.innerHTML.slice(1, 3) + inputField.innerHTML.slice(4, 5) +
                    " " + inputField.innerHTML.slice(5);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 8) {
                inputField.classList.remove("input-field-smaller");
                inputField.classList.add("input-field-smallest");
                minusField.classList.remove("minus-input-field-smaller");
                minusField.classList.add("minus-input-field-smallest");
                let spacedInput = inputField.innerHTML.slice(0, 1) + inputField.innerHTML.slice(2, 3) + " " + inputField.innerHTML.slice(3, 5) +
                    inputField.innerHTML.slice(6, 7) + " " + inputField.innerHTML.slice(7);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 9) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4, 6) +
                    inputField.innerHTML.slice(7, 8) + " " + inputField.innerHTML.slice(8);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }

            else if (numberOfDigits < 10) {
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
        }
        // if the number is decimal
        else {
            if (numberOfDigits === 7) {
                inputField.classList.remove("input-field");
                inputField.classList.add("input-field-smaller");
                minusField.classList.remove("minus-input-field");
                minusField.classList.add("minus-input-field-smaller");
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 8) {
                inputField.classList.remove("input-field-smaller");
                inputField.classList.add("input-field-smallest");
                minusField.classList.remove("minus-input-field-smaller");
                minusField.classList.add("minus-input-field-smallest");
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits < 10) {
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
        }
    }
}
))

/*
TODO:
Click on any of the operand buttons:
- when the user clicks on other number the display functionality will work again
- operator will stop to appear on
#if numA is undefined the current behaviour stays the same
#if numA has a value inputField.innerHTML = digitButton.innerHTML
#if inputField.length === 1 inputField.adjecentHTML...
- if yes
- check if the numB is defined
- if not
- current number on the screen is stored in a numB variable (converted from string to number)
- operation is made on the two numbers
- the result is displayed on the screen
- the result becomes numA, numB becomes undefined
*/

const operatorButtons = document.querySelectorAll(".operator");
// variable for storing an operator string
let operator = null;
// will become false again when the "=" button will be pressed
let operatorOn = false;
// variables for storing the first and second number
let numA = null;
let numB = null;
// variable for storing the content of the whole screen
let screenContent = null;
// this indicates when the new number needs to be displayed on the screen 
// instead of adding digits to the existing one
let newNum = false;

operatorButtons.forEach((operatorButton) => operatorButton.addEventListener("click", () => {

    // when the new button is clicked the class is removed from any other operator button that might be on
    operatorButtons.forEach((operatorButton) => {
        operatorButton.classList.remove("orange-btn-operator-on");
    })
    // and added to the one that is clicked
    operatorButton.classList.add("orange-btn-operator-on");

    // clicked operator's html will be stored in an operator variable
    operator = operatorButton.innerHTML;

    // operator will be on
    operatorOn = true;

    // numA will become the screenContent converted to a number
    screenContent = minusField.innerHTML + inputField.innerHTML;
    numA = stringToNumber(screenContent);

    // now the new number will appear on the screen when the digit button is pressed
    newNum = true;
    numberOfDigits = 1;


    console.log("operator:", operator);
    console.log("type of operator:", typeof operator);
    console.log("numA:", numA);
    console.log("type of numA:", typeof numA);
}))