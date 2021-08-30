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

// DISPLAY DIGITS FUNCTIONALITY
// for each digit button add an event listener for clicking the button
// that will handle displaying digits on the screen with spaces in the correct places
// TODO: make spaces

const digitButtons = document.querySelectorAll(".dark-grey-btn");
const inputField = document.querySelector(".input-field");

digitButtons.forEach((digitButton) => digitButton.addEventListener("click", () => {
    console.log(inputField.innerHTML.length);

    if (inputField.innerHTML === "0") {
        inputField.innerHTML = digitButton.innerHTML;
    }
    // kiedy długość === 4 spacja jest na 2 indeksie
    else if (inputField.innerHTML.length === 4) {
        let spacedInput = inputField.innerHTML.slice(0, 2) + " " + inputField.innerHTML.slice(2);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }

    else if (inputField.innerHTML.length === 6) {
        let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }

    else if (inputField.innerHTML.length === 7) {
        inputField.classList.remove("input-field");
        inputField.classList.add("input-field-smaller");
        let spacedInput = inputField.innerHTML.slice(0, 1) + " " + inputField.innerHTML.slice(1, 3) + inputField.innerHTML.slice(4, 5) + " " + inputField.innerHTML.slice(5);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }

    else if (inputField.innerHTML.length === 9) {
        let spacedInput = inputField.innerHTML.slice(0, 1) + inputField.innerHTML.slice(2, 3) + " " + inputField.innerHTML.slice(3, 5) + inputField.innerHTML.slice(6, 7) + " " + inputField.innerHTML.slice(7);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }

    else if (inputField.innerHTML.length === 10) {
        inputField.classList.remove("input-field-smaller");
        inputField.classList.add("input-field-smallest");
        let spacedInput = inputField.innerHTML.slice(0, 2) + inputField.innerHTML.slice(3, 4) + " " + inputField.innerHTML.slice(4, 6) + inputField.innerHTML.slice(7, 8) + " " + inputField.innerHTML.slice(8);
        inputField.innerHTML = spacedInput;
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }

    else if (inputField.innerHTML.length < 11) {
        inputField.insertAdjacentHTML("beforeend", digitButton.innerHTML);
    }
    console.log(inputField.innerHTML.length);
}))


