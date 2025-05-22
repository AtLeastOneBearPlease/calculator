let calcDisplay = document.querySelector("input");

let num1 = 0;
let num2 = 0;

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

function operate(operator, num1, num2){
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
            return divide(num1, num2);
            break;
    }
}

function numButtonEntered(event){
    let button = event.target;

    if(button.className === "number-button"){
        let string = calcDisplay.value;

        string += button.innerText;
        calcDisplay.value = string;
        calcDisplay.readOnly = true;
    }
}

let numberInputSection = document.querySelector("#calculator-input");
let operatorInputSection = document.querySelector("#operator-buttons");

numberInputSection.addEventListener('click', numButtonEntered);

/*



*/