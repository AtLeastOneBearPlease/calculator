let calcDisplay = document.querySelector("input");

let firstNumber = "";
let currentNumString = "";
let currentOperator = "";
let enteringFirstNumber = true;

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;   
}

function operate( num1, operator, num2){
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            if(num2 === 0) return "ERROR";
            return divide(num1, num2);
            break;
    }
}

function numButtonEntered(event){
    let button = event.target;

    if(button.className === "number-button"){
        currentNumString += button.innerText;
        setCalcDisplay();
    }
}

function setCalcDisplay(){
    calcDisplay.value = `${currentNumString} ${currentOperator} ${firstNumber}`
}

function operatorEntered(event){
    let button = event.target;

    if(button.className === 'operator-button'){
        if(button.innerText === '+'){
            if(enteringFirstNumber){
                currentOperator = "+";
                firstNumber = currentNumString;
                currentNumString = "";
                setCalcDisplay();
                enteringFirstNumber = false;
            } else {
                let num1, num2 = 0;
                num1 = parseFloat(firstNumber);
                num2 = parseFloat(currentNumString);
                currentNumString = operate(num1, currentOperator, num2).toString();
                firstNumber = "";
                currentOperator = "";
                setCalcDisplay();
                enteringFirstNumber = true;
            }
        }
    }
}

let numberInputSection = document.querySelector("#calculator-input");
let operatorInputSection = document.querySelector("#operator-buttons");

numberInputSection.addEventListener('click', numButtonEntered);
operatorInputSection.addEventListener('click', operatorEntered);

/*

We start with nothing. We need the behavior to be, press as many numbers as you like. Once you hit the operator,
save that number and then start taking in the second string of numbers. 
Once the person enters either the equals sign, or another operator, we need to invoke the operation and start the new set of numbers. 
If the equals sign or operator is pushed, then we need to set the first number in the textbox to the total and 
expect a new operator. 
If we get a new number at that point, we need to clear out the values and start over. The same for if they hit the clear button.

*/