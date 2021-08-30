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
const operator = (a, operator, b) => {
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

// for each digit button add an event listener for clicking the button
// that will handle displaying digits on the screen with spaces in the correct places
// TODO
// check how many digits are on the screen, so minus spaces and commma and minus sign
const digitButtons = document.querySelectorAll(".digit");
const inputField = document.querySelector(".input-field");
const numberOfDigits = 0;

digitButtons.forEach((digitButton) => digitButton.addEventListener("click", () => {
    if (inputField.innerHTML === "0") {
        inputField.innerHTML = digitButton.innerHTML;
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 4 && isDecimal === false) {
        let spacedInput = inputField.innerHTML.slice(0, 2) + " " + inputField.innerHTML.slice(2);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 6 && isDecimal === false) {
        let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 7 && isDecimal === false) {
        inputField.classList.remove("input-field");
        inputField.classList.add("input-field-smaller");
        let spacedInput = inputField.innerHTML.slice(0, 1) + " " + inputField.innerHTML.slice(1, 3) + inputField.innerHTML.slice(4, 5) +
            " " + inputField.innerHTML.slice(5);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 7 && isDecimal === true) {
        inputField.classList.remove("input-field");
        inputField.classList.add("input-field-smaller");
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }

    else if (inputField.innerHTML.length === 9 && isDecimal === false) {
        let spacedInput = inputField.innerHTML.slice(0, 1) + inputField.innerHTML.slice(2, 3) + " " + inputField.innerHTML.slice(3, 5) +
            inputField.innerHTML.slice(6, 7) + " " + inputField.innerHTML.slice(7);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 10 && isDecimal === false) {
        inputField.classList.remove("input-field-smaller");
        inputField.classList.add("input-field-smallest");
        let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4, 6) +
            inputField.innerHTML.slice(7, 8) + " " + inputField.innerHTML.slice(8);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length === 10 && isDecimal === true) {
        inputField.classList.remove("input-field-smaller");
        inputField.classList.add("input-field-smallest");
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }

    else if (inputField.innerHTML.length < 11 && isDecimal === false) {
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
    else if (inputField.innerHTML.length < 10 && isDecimal === true) {
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
        numberOfDigits += 1;
    }
}))



