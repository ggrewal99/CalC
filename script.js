document.addEventListener("DOMContentLoaded", () => {
    const valueKeys = document.querySelectorAll(".valueKey");
    const output = document.querySelector(".output");

    let result = 0;

    valueKeys.forEach((valueKey) => {
        valueKey.addEventListener("click", (e) => {
            const value = e.target.textContent;

            console.log(`Key pressed: ${value}`);

            result = valueKey.textContent;
            output.textContent = result;
        });
    });
});
