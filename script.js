// HELPER FUNCTIONS
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

const zeroDivisionErrorMessage = "Go back to school:)"
const divide = (a, b) => {
    if (b !== 0) {
        return a / b;
    }
    else {
        return zeroDivisionErrorMessage;
    }
}

const getPercent = (a) => {
    return a / 100;
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
    else if (operator === "x") {
        return multiply(a, b);
    }
    else if (operator === "÷") {
        return divide(a, b);
    }
}

// function to indicate that the user is about to enter a new number
const newNumber = () => {
    newNum = true;
    numberOfDigits = 1;
}

const resetFontSizeClasses = () => {
    inputField.classList.remove("input-field-error-message");
    inputField.classList.remove("input-field-smallest");
    inputField.classList.remove("input-field-smaller");
    minusField.classList.remove("minus-input-field-smallest");
    minusField.classList.remove("minus-input-field-smaller");
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

// function for displaying the result of an operation on the calculator screen
// takes a number and displays the number converted to string
// the result is the output to the calculator screen so it adds the spaces
// and replaces dots with commas to correspond to the calculator comma button

// TODO: should display the result with the correct class
const displayResult = (result) => {
    // when the result is bigger than 999 999 999 or smaller than 0,00000001 the number should be converted to the exponential
    if (result > 999999999 || result < 0.00000001) {
        const exponentialToDisplay = result.toExponential();
        inputField.innerHTML = exponentialToDisplay;
        return exponentialToDisplay;
    }
    else {
        const resultInitialString = result.toString();
        // create a list of characters
        const resultList = resultInitialString.split("");
        // replace the commas with a dot
        for (i = 0; i < resultList.length; i++) {
            if (resultList[i] === ".") {
                resultList[i] = ",";
                break;
            }
        }
        // if the number is less than 0
        // display the minus in a separate HTML element
        // remove the minus from the character array in order not to duplicate it
        if (resultList[0] === "-") {
            minusField.innerHTML = "-";
            resultList.shift();
        }
        else {
            minusField.innerHTML = "";
        }
        // iterate through list items and count the digits that appear before the first comma
        let numOfDigitsBeforeComma = 0;
        for (element of resultList) {
            if (element !== ",") {
                numOfDigitsBeforeComma += 1;
            }
            else {
                break;
            }
        }
        // place the spaces in the correct places in the list
        if (numOfDigitsBeforeComma === 5) {
            resultList.splice(2, 0, " ");
        }
        else if (numOfDigitsBeforeComma === 6) {
            resultList.splice(3, 0, " ");
        }
        else if (numOfDigitsBeforeComma === 7) {
            resultList.splice(1, 0, " ");
            resultList.splice(5, 0, " ");
        }
        else if (numOfDigitsBeforeComma === 8) {
            resultList.splice(2, 0, " ");
            resultList.splice(6, 0, " ");
        }
        else if (numOfDigitsBeforeComma === 9) {
            resultList.splice(3, 0, " ");
            resultList.splice(7, 0, " ");
        }

        // display the number as a string on the calculator screen
        const resultToDisplay = resultList.join("");
        if (resultToDisplay === zeroDivisionErrorMessage) {
            inputField.classList.add("input-field-error-message");
        }
        inputField.innerHTML = resultToDisplay;
        return resultToDisplay;
    }
}





// DISPLAY FUNCTIONALITY - clicking digit buttons, comma and minus, displays numbers and decimals
// comma can appear on the screen only once, and when there is already some number
const commaButton = document.querySelector(".comma");
let isDecimal = false;
// if the screen contains the result of the previous operation the user can't make it a decimal
let canDecimal = true;

commaButton.addEventListener("click", () => {
    screenContent = minusField.innerHTML + inputField.innerHTML;
    if (isDecimal === false && canDecimal === false) {
        isDecimal = true;
        inputField.innerHTML = "0,"
        newNum = false;
    }
    else if (isDecimal === false && canDecimal === true) {
        isDecimal = true;
        inputField.insertAdjacentHTML("beforeend", commaButton.innerHTML);
    }
})

// when the +/- button is clicked
// if the number is positive the minus sign appears at the beggining of the number
// if the number is negative the minus sign disappears from the beggining of the number
const plusMinusButton = document.querySelector("#btn-plus-minus");
const minusField = document.querySelector(".minus-input-field")

plusMinusButton.addEventListener("click", () => {
    if (newNum === false && inputField.innerHTML !== "0") {
        if (minusField.innerHTML === "-") {
            minusField.innerHTML = "";
        }
        else {
            minusField.innerHTML = "-"
        }
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
        // when the user enters a new number reset the font size classes
        resetFontSizeClasses();
        // when the user starts entering a new number the miuns sign needs to dissapear when it's present
        if (minusField.innerHTML = "-") {
            minusField.innerHTML = "";
        }

        inputField.innerHTML = digitButton.innerHTML;
        // user started to input a new number and this will be false until any operator is pressed again
        newNum = false;

        // new number is not a deciaml at the beggining
        isDecimal = false;

        // user can make a decimal out of the new number
        canDecimal = true;

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
                inputField.classList.add("input-field-smaller");
                minusField.classList.add("minus-input-field-smaller");
                let spacedInput = inputField.innerHTML.slice(0, 1) + " " + inputField.innerHTML.slice(1, 3) + inputField.innerHTML.slice(4, 5) +
                    " " + inputField.innerHTML.slice(5);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 8) {
                inputField.classList.add("input-field-smallest");
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
                inputField.classList.add("input-field-smaller");
                minusField.classList.add("minus-input-field-smaller");
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 8) {
                inputField.classList.add("input-field-smallest");
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

    // case where we do not perform an operation yet, until the second number is typed in and another operator pressed
    if (numA === null) {
        // numA will become the screenContent converted to a number
        screenContent = minusField.innerHTML + inputField.innerHTML;
        if (screenContent !== zeroDivisionErrorMessage) {
            numA = stringToNumber(screenContent);
        }


        // clicked operator's html will be stored in an operator variable
        operator = operatorButton.innerHTML;

        // newNum tells the DISPLAY FUNCTIONALITY to start entering a new number if the user presses any digit button
        // number of digits is reset to tell the DISPLAY FUNCTIONALITY to put spaces in the correct places
        newNumber();
    }
    // if numA is not null and the operator is pressed
    else if (numA !== null && operator !== null) {
        // numB becomes the screenContent converted to a number
        screenContent = minusField.innerHTML + inputField.innerHTML;
        numB = stringToNumber(screenContent);

        // numA and numB are operated
        result = operate(numA, operator, numB);

        // the value of result is converted to string and displayed on the screen
        if (result !== undefined) {
            displayResult(result);
        }

        // user can't make a decimal out of the current number because it is the result of the previous operation
        canDecimal = false;

        // the result becomes the new numA
        screenContent = minusField.innerHTML + inputField.innerHTML;
        if (screenContent !== zeroDivisionErrorMessage) {
            numA = stringToNumber(screenContent);
        }
        else {
            numA = null;
        }

        // this tells the DISPLAY functionality that we have a new numA and to start entering a new number
        newNumber();

        // numB becomes null again
        numB = null;

        // the operator that is clicked becomes a new operator
        operator = operatorButton.innerHTML;
    }
    else if (numA !== null && operator === null) {
        operator = operatorButton.innerHTML;
    }
}))

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
    if (numA !== null) {
        // numB becomes the screenContent converted to a number
        screenContent = minusField.innerHTML + inputField.innerHTML;
        numB = stringToNumber(screenContent);

        // numA and numB are operated
        result = operate(numA, operator, numB);

        // the value of result is converted to string and displayed on the screen
        if (result !== undefined) {
            displayResult(result);
        }

        // user can't make a decimal out of the current number because it is the result of the previous operation
        canDecimal = false;

        // the result becomes the new numA
        screenContent = minusField.innerHTML + inputField.innerHTML;
        if (screenContent !== zeroDivisionErrorMessage) {
            numA = stringToNumber(screenContent);
        }
        else {
            numA = null;
        }

        // this tells the DISPLAY functionality that we have a new numA and to start entering a new number
        newNumber();

        // numB becomes null again
        numB = null;

        // operator becomes null again
        operator = null;
        operatorButtons.forEach((operatorButton) => {
            operatorButton.classList.remove("orange-btn-operator-on");
        })
    }
})

/*
TODO
- for bigger or smaller numbers the result should be converted to the exponential: operate()
- display result function should display the result with the correct class on: displayResult() - make sure it will handle the exponentials


- percent functionality:
currently displayed number (A or B) is displayed divded by 100 and is stored in a variable

- clear functionality:
clears the curret number and makes it 0
if numA is null && screen === "0": nothing happens when pressed; shows AC
if numA is null && screen !== "0": screen becomes "0" when pressed; shows C -> AC; newNum becomes true; number of digits becomes 1
if numA !== null: screen becomes "0" when pressed; shows C -> AC; the operator stays on; numA actually stays the same

- media query for mobile
*/

