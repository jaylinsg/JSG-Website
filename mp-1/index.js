// when information is collected in html, use DOMContentLoaded to access it
// nothing happens until all info (2 ints, 1 op) are collected
document.addEventListener('DOMContentLoaded', () => {

    // literally get element by it's id
    const input1    = document.getElementById('calc-input1');
    const input2    = document.getElementById('calc-input2');
    const resultDiv = document.getElementById('result');

    // fun -> calculate result
    function calculate(op) {
        // read inputs, convert to decimal
        const num1 = parseFloat(input1.value);
        const num2 = parseFloat(input2.value);

        // confirms both inputs are numbers, else show error message
        if (isNaN(num1) || isNaN(num2)) {
            resultDiv.textContent = 'Enter two valid numbers.';
            resultDiv.classList.remove('negative');
            return;
        }

        let result;
        // use switch for each op possibility
        switch (op) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
            break;
            case 'multiply':
                result = num1 * num2;
                break;
            // if dividing by 0, error message
            case 'divide':
                result = num2 !== 0
                ? num1 / num2
                : 'Error: cannot divide by 0';
                break;
            case 'power':
                // compute num1^num2 using a simple loop
                result = 1;
                for (let i = 0; i < num2; i++) {
                    result *= num1;
                }
                break;
        }

        // make negative results red (in css -> result.negative)
        if (typeof result === 'number' && result < 0) {
            resultDiv.classList.add('negative');
        } else {
            resultDiv.classList.remove('negative');
        }
        // display result
        resultDiv.textContent = result;
    }

    // for each op button: find by id, wait for click, calculate with string op
    document.getElementById('add-btn')     .addEventListener('click', () => calculate('add'));
    document.getElementById('subtract-btn').addEventListener('click', () => calculate('subtract'));
    document.getElementById('multiply-btn').addEventListener('click', () => calculate('multiply'));
    document.getElementById('divide-btn')  .addEventListener('click', () => calculate('divide'));
    document.getElementById('power-btn')   .addEventListener('click', () => calculate('power'));

    // final button allows user to clear calc
    document.getElementById('clear-btn').addEventListener('click', () => {
        input1.value = '';
        input2.value = '';
        resultDiv.textContent = '';
        resultDiv.classList.remove('negative');
    });
});
