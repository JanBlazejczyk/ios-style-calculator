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

// when the user tries to divide by 0 the result is a message
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

// funtion to reset the size of the digits
const resetFontSizeClasses = () => {
    inputField.classList.remove("input-field-error-message");
    inputField.classList.remove("input-field-smallest");
    inputField.classList.remove("input-field-smaller");
    minusField.classList.remove("minus-input-field-smallest");
    minusField.classList.remove("minus-input-field-smaller");
}

// function to switch a string to a number
// it uses the content from the calculator screen so it removes the spaces
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
// the result is the output to the calculator screen so it adds the spaces in the correct places
// and replaces dots with commas to correspond to the calculator comma button
const displayResult = (result) => {
    // when the result is bigger than 999 999 999 or smaller than -0,00000001 the number should be converted to the exponential
    // toExponential() converts the number to a string so the further conversion is not needed
    // and the exponential is displayed on the screen
    if (result > 999999999 || result < -999999999) {
        const exponentialToDisplay = result.toExponential(1);
        inputField.innerHTML = exponentialToDisplay;
        return exponentialToDisplay;
    }
    else {
        let resultInitialString = result.toString();
        // some numbers are not as big or as small to become exponentials
        // but they are long because of the number of decimals spaces and may overflow the screen
        // if the number has more than 9 digits (in case of negative numbers there's a "-"" at the beggining)
        if ((resultInitialString.length > 10 && result < 0) || (resultInitialString.length > 9 && result >= 0)) {
            // convert the numbers that we operate on to lists
            // figure out the index of the decimal point
            if (numB !== null) {
                const numAString = numA.toString();
                const numAList = numAString.split("");
                const decimalIndexA = numAList.indexOf(".");

                const numBString = numB.toString();
                const numBList = numBString.split("");
                const decimalIndexB = numBList.indexOf(".");

                // figure out the number of decimal places in both numbers
                let numberOfDecimalPlacesA = 0
                let numberOfDecimalPlacesB = 0;
                if (decimalIndexA !== -1) {
                    numberOfDecimalPlacesA = numAList.length - decimalIndexA - 1;
                }

                if (decimalIndexB !== -1) {
                    numberOfDecimalPlacesB = numBList.length - decimalIndexB - 1;
                }
                // figure out the number of decimal places to round the result to
                const rounder = Math.max(numberOfDecimalPlacesA, numberOfDecimalPlacesB);
                // round the result and override the resultInitialString
                roundedResult = result.toFixed(rounder);
                resultInitialString = roundedResult.toString();
            }

        }

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
            inputField.classList.add("input-field-smallest");
            minusField.classList.add("minus-input-field-smallest");
        }
        else if (numOfDigitsBeforeComma === 9) {
            resultList.splice(3, 0, " ");
            resultList.splice(7, 0, " ");
            inputField.classList.add("input-field-smallest");
            minusField.classList.add("minus-input-field-smallest");
        }

        // give the displayed result the proper font size
        if (resultList.length === 7) {
            inputField.classList.add("input-field-smaller");
            minusField.classList.add("minus-input-field-smaller");
        }
        else if (resultList.length === 8) {
            inputField.classList.add("input-field-smallest");
            minusField.classList.add("minus-input-field-smallest");
        }
        else if (resultList.length >= 9) {
            inputField.classList.add("input-field-smallest");
            minusField.classList.add("minus-input-field-smallest");
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
    // and the clear button now has something to clear and indicates it
    clearButton.innerHTML = "C";
    // if the newNum is true we stored one number and the operator is clicked
    // the user will now enter a new number
    if (newNum === true || inputField.innerHTML === "0") {
        // when the user enters a new number reset the font size classes
        resetFontSizeClasses();
        // when the user starts entering a new number the miuns sign needs to dissapear when it's present
        if (minusField.innerHTML = "-") {
            minusField.innerHTML = "";
        }
        // the first digit is displayed on the screen instead of a "0"
        inputField.innerHTML = digitButton.innerHTML;
        // user started to input a new number and this will be false until any operator is pressed
        newNum = false;

        // new number is not a deciaml at the beggining
        isDecimal = false;

        // user can make a decimal and percent out of the new number
        canDecimal = true;
        canPercent = true;
    }
    // some number is already in
    else {
        // add spaces before the comma
        if (isDecimal === false) {
            if (numberOfDigits === 4) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + " " + inputField.innerHTML.slice(2);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 5) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 6) {
                inputField.classList.add("input-field-smaller");
                minusField.classList.add("minus-input-field-smaller");
                let spacedInput = inputField.innerHTML.slice(0, 1) + " " + inputField.innerHTML.slice(1, 3) + inputField.innerHTML.slice(4, 5) +
                    " " + inputField.innerHTML.slice(5);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 7) {
                inputField.classList.add("input-field-smallest");
                minusField.classList.add("minus-input-field-smallest");
                let spacedInput = inputField.innerHTML.slice(0, 1) + inputField.innerHTML.slice(2, 3) + " " + inputField.innerHTML.slice(3, 5) +
                    inputField.innerHTML.slice(6, 7) + " " + inputField.innerHTML.slice(7);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
            else if (numberOfDigits === 8) {
                let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4, 6) +
                    inputField.innerHTML.slice(7, 8) + " " + inputField.innerHTML.slice(8);
                inputField.innerHTML = spacedInput;
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }

            else if (numberOfDigits < 9) {
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
            else if (numberOfDigits < 9) {
                inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
                numberOfDigits += 1;
            }
        }
    }
}))

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

// event listener for clicking any of the operator buttons
// that will handle storing numbers in variables and conducting math operations on them
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener("click", () => {
    clearButton.innerHTML = "C";
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
    // if numA is stored and the operator is active
    else if (numA !== null && operator !== null) {
        // numB becomes the screenContent converted to a number
        screenContent = minusField.innerHTML + inputField.innerHTML;
        numB = stringToNumber(screenContent);
        // numA and numB are operated on
        result = operate(numA, operator, numB);
        // the value of result is converted to string and displayed on the screen
        if (result !== undefined) {
            displayResult(result);
        }
        // user can't make a decimal out of the current number because it is the result of the previous operation
        canDecimal = false;
        // the result becomes the new numA
        screenContent = minusField.innerHTML + inputField.innerHTML;
        // if the screen contains 0 division error message, do not store it in numA variable
        // as it leads to NaN being the result of the next operation
        if (screenContent !== zeroDivisionErrorMessage) {
            numA = stringToNumber(screenContent);
        }
        else {
            numA = null;
        }
        // this tells the DISPLAY functionality that we have a new numA and to start entering a new number
        newNumber();
        numB = null;
        // the operator that is clicked becomes a new operator
        operator = operatorButton.innerHTML;
    }
    // if numA is stored and the operator is not already active, the pressed operator becomes the current operator
    else if (numA !== null && operator === null) {
        operator = operatorButton.innerHTML;
    }
}))

// event listener for clicking the equal button
// that will behave similar to clicking the operator when the result of the previous operation
// is already on the screen, but this time all the operator buttons will become off
// and operator will become null
const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
    // it works only when numA is stored
    if (numA !== null) {
        // numB becomes the screenContent converted to a number
        screenContent = minusField.innerHTML + inputField.innerHTML;
        numB = stringToNumber(screenContent);
        // numA and numB are operated on
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

// variable to check if the user can make a percentage out of the number
let canPercent = true;
// event listener for clicking the percent button
// that will show the number that is currently displayed divided by 100
const percentButton = document.querySelector("#btn-percent");
percentButton.addEventListener("click", () => {
    if (canPercent === true) {
        // when the button is clicked get the current screen content (string)
        screenContent = minusField.innerHTML + inputField.innerHTML;
        // convert it to a number to perform an operation
        const numberToGetpercent = stringToNumber(screenContent);
        // get a percent of the number
        const percent = getPercent(numberToGetpercent);
        // display it on the screen (converted to a string)
        displayResult(percent);
        // when the percent is displayed, the next input becomes a new number
        newNumber();
        // if the operator is not on we store the percent in numA
        if (operator === null) {
            numA = percent;
        }
        // if the operator is on we store the percent in numB
        else {
            numB = percent;
        }
        // user can make a percent out of the result, becomes true when the user starts inputing a new number
        canPercent = false;
    }
})
// event listener for the clear button that will reset everything to the initial stage
const clearButton = document.querySelector("#btn-clear");
clearButton.addEventListener("click", () => {
    // clear the screen
    minusField.innerHTML = "";
    inputField.innerHTML = "0";
    // clear the operand
    operator = null;
    operatorButtons.forEach((operatorButton) => {
        operatorButton.classList.remove("orange-btn-operator-on");
    })
    // clear numA and numB
    numA = null;
    numB = null;
    // enable making the new button a decimal
    isDecimal = false;
    canDecimal = true;
    newNumber();
    // reset the font size to the initial value
    resetFontSizeClasses();
    // display "all clear again"
    clearButton.innerHTML = "AC";
})
