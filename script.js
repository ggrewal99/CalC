document.addEventListener("DOMContentLoaded", () => {
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
    let calculated = false;

    valueKeys.forEach((valueKey) => {
        valueKey.addEventListener("click", (e) => {
            const value = e.target.textContent;
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

        if (!isNaN(parseInt(lastInput))) {
            result = calculatedValue();
        } else {
            result = prevNum;
        }

        output.textContent = result;

        isCalculatedNumber = true;
        prevNum = result;
        lastInput = calculateKey.textContent;
        calculated = true;
    });

    operationKeys.forEach((operationKey) => {
        operationKey.addEventListener("click", (e) => {
            const operation = e.target.textContent;

            if (isNaN(parseInt(lastInput))) {
                operator = operation;
                result = "";
                lastInput = operation;
                return;
            }

            if (prevNum !== "0") {
                prevNum = calculatedValue();
                calculated = true;
                output.textContent = prevNum;
            } else {
                prevNum = result;
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
            return parseInt(prevNum) * parseInt(result);
        } else if (operator === "-") {
            return parseInt(prevNum) - parseInt(result);
        } else if (operator === "+") {
            return parseInt(prevNum) + parseInt(result);
        } else if (operator === "/") {
            if (result === "0") {
                return "Error";
            }
            return parseInt(prevNum) / parseInt(result);
        }
    };
});
