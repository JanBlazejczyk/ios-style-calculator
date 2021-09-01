// helper functions for basic math operations
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
// it uses the input from the calculator screen so it removes the spaces
// and replaces commas with dots to represent a correct decimal
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

// DISPLAY FUNCTIONALITY - clicking digit buttons, comma and minus, displays numbers and decimals
// comma can appear on the screen only once, and when there is already some number
const commaButton = document.querySelector(".comma");
let isDecimal = false;

commaButton.addEventListener("click", () => {
    if (isDecimal === false) {
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

// event listener for clicking any of the digit buttons
// that will handle displaying digits on the screen with spaces in the correct places
const digitButtons = document.querySelectorAll(".digit");
const inputField = document.querySelector(".digit-input-field");
// variable that monitors the number of digits on the screen
// it is used to put spaces in the correct places
let numberOfDigits = 1;

digitButtons.forEach((digitButton) => digitButton.addEventListener("click", () => {
    // when a digit button is pressed all operator buttons must appear off
    operatorButtons.forEach((operatorButton) => {
        operatorButton.classList.remove("orange-btn-operator-on");
    })

    // if the newNum is true we stored one number and the operator is clicked
    // the user will now enter a new number
    if (newNum === true || inputField.innerHTML === "0") {
        inputField.innerHTML = digitButton.innerHTML;
        // user started to input a new number and this will be false until any operator is pressed again
        newNum = false;

        // new number is not a deciaml at the beggining
        isDecimal = false;

        // if the screen displays "0" clicking 0 another time shouldn't add any digits
        if (digitButton.innerHTML !== "0") {
            numberOfDigits += 1;
        }

    }
    // some number is already in
    else {
        // add spaces before the comma
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
        // do not add spaces after the comma
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

// CONDUCTING MATH OPERATIONS FUNCTIONALITY
// variable for storing an operator string
let operator = null;
// variables for storing the first and the second number to operate on
let numA = null;
let numB = null;
// variable for storing what is already on the calculator screen
let screenContent = null;
// this indicates when the new number needs to be displayed on the screen 
// instead of adding digits to the existing one
let newNum = false;

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener("click", () => {

    // when the operator button is clicked the class is removed from any other operator button that might be on
    operatorButtons.forEach((operatorButton) => {
        operatorButton.classList.remove("orange-btn-operator-on");
    })
    // and added to the one that is clicked
    operatorButton.classList.add("orange-btn-operator-on");

    // if numA is null
    // numA will become the screenContent converted to a number
    screenContent = minusField.innerHTML + inputField.innerHTML;
    numA = stringToNumber(screenContent);

    // clicked operator's html will be stored in an operator variable
    operator = operatorButton.innerHTML;

    // newNum tells the DISPLAY FUNCTIONALITY to start entering a new number if the user presses any digit button
    // number of digits is reset to tell the DISPLAY FUNCTIONALITY to put spaces in the correct places
    newNum = true;
    numberOfDigits = 1;

    /*
   TODO:
   - if numA is not null and the operator is pressed:
   - numB will become the screenContent converted to the number
   - numA and numB will be operated on with the operator: result = operate(numA, operator, numB)
   - the value of result will be converted to string and displayed on the screen: first write a function to do so
   #takes a number
   #splits it into the list of digits and dots with a possible minus at the beggining
   #replaces dots with commas
   #adds spaces in correct places
   #converts the whole think back to the string
   #displays it on the screen 
   - this value will then become numA
   - the new operator will become an operator: operator = operatorButton.innerHTML; - this line again
   */
}))