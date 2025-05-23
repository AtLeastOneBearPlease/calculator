let calcDisplay = document.querySelector("input");

let firstNumber = "";
let secondNumber = "";
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
            results = multiply(num1, num2);
            break;
        case "/":
            if(num2 === 0) {
                results = "ERROR";
                //Use clear here and restart the calculator later;
            } else {
                results = divide(num1, num2);
            }
            break;
    }

    
    let resultsString = results.toString();

    if(resultsString.length > 15){
        let decimalLocation = resultsString.indexOf('.');

        let decimalsToRound = resultsString.length - decimalLocation;

        results = roundDecimal(results, decimalsToRound);    
    }

    isFirstCalculation = false;
    prepForNextCalculation(results);
    setCalcDisplay(results);
}

function roundDecimal(number, precision = 2) {
  if (Number.isFinite(number) && number % 1 !== 0) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
  return number;
}

function prepForNextCalculation(result){
    firstNumber = result;
    secondNumber = "";
    currentOperator = "";
}

function numButtonEntered(event){
    let button = event.target;

    if(button.className === "number-button"){
        //Allow you to overwrite the displayed result after a calculation
        if(isFirstCalculation === false && currentOperator === "")
        {
            firstNumber = button.innerText;
            isFirstCalculation = true;
            isFirstValue = true;
        } 
        else {
            //Make sure that we are updating the correct string
            if(isFirstValue){
                firstNumber += button.innerText;
            } else {
                secondNumber += button.innerText;
            }
        }

        setCalcDisplay();
    }
}

function setCalcDisplay(optionalString = ''){
    if(optionalString === ''){
        calcDisplay.value = `${secondNumber} ${currentOperator} ${firstNumber}`
    } else {
        calcDisplay.value = optionalString;
    }
}

//Handle the operator behaviors
function operatorEntered(event){
    let buttonText = event.target.innerText;

    if(event.target.className === 'operator-button'){
        if(buttonText === '+' || buttonText === '-' || buttonText === '/' || buttonText === '*')
        {
            if(isFirstValue && firstNumber !== ''){
                isFirstValue = false;
            } else if(secondNumber !== ''){ //Make sure we aren't calculating against nothing
                //Do the current operation, even if it's currently another operator
                operate(parseFloat(firstNumber), currentOperator, parseFloat(secondNumber));
            }

            //Set the operator as long as the first value has been entered and the second number is empty
            //This can happen if the operator is pressed when there has been no value input
            if(!isFirstValue && secondNumber === ''){
                currentOperator = buttonText;
            }
        } else if(buttonText === '='){
            if(!isFirstValue && currentOperator !== ''){
                operate(parseFloat(firstNumber), currentOperator, parseFloat(secondNumber));           
            }
        }

        setCalcDisplay();
    }
}

function clear(){
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    isFirstValue = true;
    isFirstCalculation = true;
    setCalcDisplay();
}

function backspace(){
    if(firstNumber !== '' && currentOperator !== ''){
        secondNumber = secondNumber.slice(0, -1);
    } else if(firstNumber !== ''){
        firstNumber = firstNumber.slice(0, -1);
    }
    setCalcDisplay();
}

let numberInputSection = document.querySelector("#calculator-input");
let operatorInputSection = document.querySelector("#operator-buttons");
let clearButton = document.querySelector('#clear-button');
let delButton = document.querySelector('#delete-button');

numberInputSection.addEventListener('click', numButtonEntered);
operatorInputSection.addEventListener('click', operatorEntered);
clearButton.addEventListener('click', clear);
delButton.addEventListener('click', backspace);

/*

TODO:

Add hover effects to buttons.
Add a delete button
Add a decimnal button
Change the background of the webpage to nice gradient
Change the button cursor to a pointer

*/