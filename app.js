let display = document.getElementById("display");
let currentInput = "";
let lastInput = "";
let operator = "";

function appendNumber(number) {
  if (currentInput.length >= 12) return; // Limit input length
  if (currentInput === "0" && number === 0) return; // Avoid multiple leading zeros
  currentInput += number.toString();
  updateDisplay(currentInput);
}

function appendDot() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}

function appendOperator(op) {
  if (currentInput === "" && lastInput === "") return; // Prevent operator without numbers
  if (currentInput !== "") {
    if (lastInput === "") {
      lastInput = currentInput;
    } else {
      lastInput = calculate(lastInput, currentInput, operator);
    }
  }
  operator = op;
  currentInput = "";
  updateDisplay(lastInput + " " + operator);
}

function calculateResult() {
  if (lastInput === "" || currentInput === "") return;
  const result = calculate(lastInput, currentInput, operator);
  updateDisplay(result);
  lastInput = result.toString();
  currentInput = "";
}

function calculate(a, b, operator) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  if (isNaN(num1) || isNaN(num2)) return "";
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 === 0 ? "Error" : num1 / num2;
    case "%":
      return num1 % num2;
    default:
      return "";
  }
}

function clearDisplay() {
  currentInput = "";
  lastInput = "";
  operator = "";
  updateDisplay("0");
}

function deleteLast() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

function updateDisplay(value) {
  display.innerText = value;
}
