let calcDisplay = document.querySelector("input");

let firstNumber = "";
let secondNumber = "";
let currentNumString = "";
let currentOperator = "";
let isFirstValue = true;
let isFirstCalculation = true;

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
    let results = 0;
    switch(operator) {
        case "+":
            results = add(num1, num2);   
            break;
        case "-":
            results = subtract(num1, num2);   
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            if(num2 === 0) return "ERROR"
            results = divide(num1, num2);
            break;
    }

    isFirstCalculation = false;
    prepForNextCalculation(results);
    return results;
}

function prepForNextCalculation(result){
    firstNumber = result;
    secondNumber = "";
    currentOperator = "";
}

function numButtonEntered(event){
    let button = event.target;

    if(button.className === "number-button"){
        if(isFirstCalculation === false && currentOperator === "")
        {
            firstNumber = button.innerText;
            isFirstCalculation = true;
            isFirstValue = true;
        } 
        else {
            if(isFirstValue){
                firstNumber += button.innerText;
            } else {
                secondNumber += button.innerText;
            }
        }

        setCalcDisplay();
    }
}

function setCalcDisplay(){
    calcDisplay.value = `${secondNumber} ${currentOperator} ${firstNumber}`
}

function operatorEntered(event){
    let button = event.target;

    if(button.className === 'operator-button'){
        if(button.innerText === '+'){
            if(isFirstValue){
                currentOperator = '+';
                isFirstValue = false;
            } else if(secondNumber === ''){
                currentOperator = '+';
            } else{
                operate(parseFloat(firstNumber), currentOperator, parseFloat(secondNumber)).toString();
                currentOperator = '+';
            }
        }
        if(button.innerText === '-'){
            if(isFirstValue){
                currentOperator = '-';
                isFirstValue = false;
            } else if(secondNumber === ''){
                currentOperator = '-';
            } else {
                operate(parseFloat(firstNumber), currentOperator, parseFloat(secondNumber)).toString();
                currentOperator = '-';
            }
        }
        setCalcDisplay();
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