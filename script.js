document.addEventListener("DOMContentLoaded", () => {
    const themeIcon = document.querySelector("#theme-icon");

    themeIcon.addEventListener("click", () => {
        document.querySelector("body").classList.toggle("theme-2");
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.classList.toggle("theme-2");
        });
    });

    const valueKeys = document.querySelectorAll(".valueKey");
    const output = document.querySelector(".output");
    const clearKey = document.querySelector(".clearKey");

    const operationKeys = document.querySelectorAll(".operationKey");
    const calculateKey = document.querySelector(".calculateKey");

    let result = "";
    let decimal = false;
    let prevNum = "0";
    let operator = "";
    let lastInput = "";

    // If the number in the output box is a calculation,
    // the next number input will not append to it but replace it
    let isCalculatedNumber = false;

    valueKeys.forEach((valueKey) => {
        valueKey.addEventListener("click", (e) => {
            const value = e.target.textContent;
            if (lastInput === "=") {
                clearKey.click();
            }
            lastInput = value;

            if (value === "." && decimal) {
                if (decimal) return;
                decimal = true;
            }

            if (output.textContent === "0") {
                if (decimal) {
                    result = "0" + value;
                } else if (value === "0") {
                    result = "0";
                } else {
                    result = value;
                }
            } else if (isCalculatedNumber) {
                // Start fresh, do not append
                result = value;
            } else {
                result += value;
            }
            output.textContent = result;
        });
    });

    calculateKey.addEventListener("click", () => {
        // console.log("Prev num:", prevNum);
        // console.log("Current num:", result);

        if (!isNaN(parseFloat(lastInput))) {
            result = calculatedValue();
        } else {
            result = prevNum;
        }

        output.textContent = result;

        isCalculatedNumber = true;
        prevNum = result;
        lastInput = calculateKey.textContent;
    });

    operationKeys.forEach((operationKey) => {
        operationKey.addEventListener("click", (e) => {
            const operation = e.target.textContent;

            if (operation === "+/-") {
                result *= -1;
                output.textContent = result;
                return;
            }

            if (isNaN(parseFloat(lastInput))) {
                operator = operation;
                result = "";
                lastInput = operation;
                return;
            }

            if (prevNum !== "0") {
                prevNum = calculatedValue();
                output.textContent = prevNum;
            } else {
                prevNum = 0;
                prevNum = calculatedValue();
                output.textContent = prevNum;
            }

            // Change to new operator once prev calc is complete
            // with old operator
            operator = operation;

            result = "";
            lastInput = operation;
            isCalculatedNumber = false;
        });
    });

    clearKey.addEventListener("click", () => {
        result = "";
        prevNum = "0";
        output.textContent = "0"; // String 0
        lastInput = "";
        decimal = false;
        operator = "";
        isCalculatedNumber = false;
    });

    const calculatedValue = () => {
        console.log("Prev num:", prevNum);
        console.log("Current num:", result);
        if (operator === "x") {
            return parseFloat(prevNum) * parseFloat(result);
        } else if (operator === "-") {
            return parseFloat(prevNum) - parseFloat(result);
        } else if (operator === "+") {
            return parseFloat(prevNum) + parseFloat(result);
        } else if (operator === "/") {
            if (result === "0") {
                return "Error";
            }
            return parseFloat(prevNum) / parseFloat(result);
        }

        return parseFloat(prevNum) + parseFloat(result);
    };
});
