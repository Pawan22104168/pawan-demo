// Advanced Calculator Logic
const display = document.getElementById('display');
let current = '0';
let operator = null;
let operand = null;
let waitingForOperand = false;

function updateDisplay() {
    display.textContent = current.length > 12 ? parseFloat(current).toExponential(6) : current;
}

function inputNumber(num) {
    if (waitingForOperand) {
        current = num;
        waitingForOperand = false;
    } else {
        if (current === '0' && num !== '.') {
            current = num;
        } else if (num === '.' && current.includes('.')) {
            return;
        } else {
            current += num;
        }
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    if (operator && !waitingForOperand) {
        calculate();
    }
    operand = parseFloat(current);
    operator = nextOperator;
    waitingForOperand = true;
}

function calculate() {
    if (operator && operand !== null) {
        let result = 0;
        const curr = parseFloat(current);
        switch (operator) {
            case 'add': result = operand + curr; break;
            case 'subtract': result = operand - curr; break;
            case 'multiply': result = operand * curr; break;
            case 'divide': result = curr === 0 ? 'Error' : operand / curr; break;
            default: return;
        }
        current = result.toString();
        operator = null;
        operand = null;
        waitingForOperand = false;
        updateDisplay();
    }
}

function clearAll() {
    current = '0';
    operator = null;
    operand = null;
    waitingForOperand = false;
    updateDisplay();
}

function backspace() {
    if (!waitingForOperand && current.length > 1) {
        current = current.slice(0, -1);
    } else {
        current = '0';
    }
    updateDisplay();
}

function percent() {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
}

// Button event listeners
document.querySelectorAll('.btn.number').forEach(btn => {
    btn.addEventListener('click', e => inputNumber(btn.dataset.number));
});
document.querySelectorAll('.btn.operator').forEach(btn => {
    btn.addEventListener('click', e => inputOperator(btn.dataset.action));
});
document.querySelector('.btn.equals').addEventListener('click', calculate);
document.querySelector('.btn.function[data-action="clear"]').addEventListener('click', clearAll);
document.querySelector('.btn.function[data-action="backspace"]').addEventListener('click', backspace);
document.querySelector('.btn.function[data-action="percent"]').addEventListener('click', percent);

// Keyboard support
document.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        inputNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
        inputOperator(e.key === '+' ? 'add' : 'subtract');
    } else if (e.key === '*' || e.key === 'x') {
        inputOperator('multiply');
    } else if (e.key === '/' || e.key === '÷') {
        inputOperator('divide');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === '%') {
        percent();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearAll();
    }
});

updateDisplay(); 