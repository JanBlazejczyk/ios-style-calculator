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
// takes two numbers and an operator
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

// for each digit button add an event listener for clicking the button
// that will handle displaying digits on the screen
// TODO: make spaces
// kiedy długość === 5 spacja jest na 2 indeksie
// kiedy długość === 6 spacja jest na 3 indeksie
// kiedy długość === 7 spacja jest na 1 i 5 indeksie
// kiedy długość === 8 spacja jest na 2 i 6 indeksie
// kiedy długość === 7 spacja jest na 3 i 7 indeksie
const digitButtons = document.querySelectorAll(".dark-grey-btn");
const inputField = document.querySelector(".input-field");

digitButtons.forEach((digitButton) => digitButton.addEventListener("click", () => {

    if (inputField.innerHTML === "0") {
        inputField.innerHTML = digitButton.innerHTML;
    }
    else if (inputField.innerHTML.length === 6) {
        inputField.classList.remove("input-field");
        inputField.classList.add("input-field-smaller");
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }
    else if (inputField.innerHTML.length < 9) {
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }
}))


