
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', event => {

    //console.log('NEW');
    const key = event.target;
    const action = key.dataset.action;
    //console.log(`action "${action}"`);
    // What key has been pressed
    const keyContent = key.textContent;
    //console.log(`keyContent "${keyContent}"`);
    // What is displayed right now
    const displayedNum = display.textContent;
    //console.log(`displayedNum "${displayedNum}"`);
    // Use data attribute to determine what type of key is pressed (numbers don't have data attribute)  
    const previousKeyType = calculator.dataset.previousKeyType;
    //console.log(`previousKeyType "${previousKeyType}"`);

    //depresses operator key if it was pressed earlier;
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed')); 

    //removes all data attributes and sets display to 0
    const allClear = () => {
        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        document.getElementById('calculator-display').style.fontSize = '26px';
    }

    // if Error is displayed allow nothing but All Clear or new number
    if (display.textContent === 'Error') {
        if (action === 'clear') {
            allClear();
        } else {
            return;
        }
        
        // else if (
        //     action === 'decimal' ||
        //     action === 'calculate' ||
        //     action === 'multiply' ||
        //     action === 'add' ||
        //     action === 'subtract' ||
        //     action === 'divide' ||
        //     action === 'power' ||
        //     action === 'negative' ||
        //     action === 'root'
        //     ) {
        //     return;
        // }
    } 

    if (action === 'number') {
        if (displayedNum === "0" || previousKeyType === 'operator') {
            display.textContent = keyContent;
            // if we hit a number after "calculate" and zero is displayed, we should All Clear everything
            if (displayedNum === "0" && previousKeyType === 'calculate') {
                allClear(); 
                display.textContent = keyContent;
            }
        // if we hit a number after "calculate" it should work as All Clear button;
        } else if (previousKeyType === 'calculate') {
            console.log('test');
            allClear(); // 
            display.textContent = keyContent;
        } else if (displayedNum === "-0") {
            display.textContent = displayedNum.replace('0', keyContent);
        } else {
            if (display.textContent.length > 23) { // this checks if output is no more than 24 symbols
                return 
            } else {
                display.textContent = displayedNum + keyContent;
            }
                
        }

        // change font-size when display length is too big
        if (display.textContent.length >= 17) {
            document.getElementById('calculator-display').style.fontSize = '18px';
        } else {
            document.getElementById('calculator-display').style.fontSize = '26px';
        }
            calculator.dataset.previousKeyType = 'number';
        }

    // Decimal is pressed

    if (action === 'decimal') {
        
        if (previousKeyType === 'operator') {
            display.textContent = "0.";
        } else if (previousKeyType === 'calculate') {
            allClear();
            display.textContent = "0.";
        } else if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + '.';
        } 

        calculator.dataset.previousKeyType = 'decimal';
    }

    // Calculation function 

    const calculate = (num1, operator, num2) => {
        let result = "";	
        
        if (operator === 'multiply') {
            result = +num1 * +num2;
        }
        
        if (operator === 'add') {
            result = +num1 + +num2;
        }
        
        if (operator === 'divide') {
            result = +num1 / +num2;
        }
        
        if (operator === 'subtract') {
            result = +num1 - +num2;
        }

        if (operator === 'power') {
            result = (+num1) ** (+num2);
        }

        if (operator === 'root') {
            if (num1.includes('-')) {
                return 'Error';
            } else {
                result = Math.sqrt(+num1);
            }
        }
        
        if (result === Infinity) {
            return 'Error';

            // if result is floating point && contains multiple zeros or nines,
            // round result and delete trailing zeros    
        } else if (result.toString().includes('.') && /[0|9]{13,15}/.test(result)) {
            return parseFloat(result).toFixed(14).replace(/[0]*$/, '');
            } else {
            return result;
        }
    }

    // This is executed after user presses 'calculate' sign

    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
        
        //console.log(`operator "${operator}"`);
        // console.log(`previousKeyType "${previousKeyType}"`);
        
        if (firstValue) {
            //console.log(`firstValue "${firstValue}"`);
            //console.log(`secondValue "${secondValue}"`);
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = calculator.dataset.modValue;
                //console.log(`firstValue "${firstValue}"`);
                //console.log(`secondValue "${secondValue}"`);
            }
        display.textContent = calculate(firstValue, operator, secondValue)//.toString().slice(0, 11);
        }

        // change font-size if display length is too big
        if (display.textContent.length >= 17) {
            document.getElementById('calculator-display').style.fontSize = '18px';
        } else {
            document.getElementById('calculator-display').style.fontSize = '26px';
        }
        calculator.dataset.previousKeyType = 'calculate';
        calculator.dataset.modValue = secondValue;
    }

    if (
        action === 'multiply' ||
        action === 'add' ||
        action === 'subtract' ||
        action === 'divide' ||
        action === 'power' ||
        action === 'root'
    ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (
            firstValue && 
            operator && 
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ) {
            const calcValue = calculate(firstValue, operator, secondValue);

            display.textContent = calcValue;

            if (display.textContent.length >= 17) {
                document.getElementById('calculator-display').style.fontSize = '18px';
            } else {
                document.getElementById('calculator-display').style.fontSize = '26px';
            }

            calculator.dataset.firstValue = calcValue;
        // handle cases like 9 - root - plus - 1   
        } else if (operator === 'root') {
            const calcValue = calculate(firstValue, operator, secondValue);

            display.textContent = calcValue;

            if (display.textContent.length >= 17) {
                document.getElementById('calculator-display').style.fontSize = '18px';
            } else {
                document.getElementById('calculator-display').style.fontSize = '26px';
            }

            calculator.dataset.firstValue = calcValue;

        } else {
            calculator.dataset.firstValue = displayedNum;
        }
        
        key.classList.add('pressed'); // when operator key is pressed, it remains white
        
        calculator.dataset.operator = action;
        calculator.dataset.previousKeyType = 'operator'; 
    };
    
    if (action === 'clear') {
        allClear();
    }

    if (action === 'negative') {
        if (previousKeyType === 'operator') {
            display.textContent = "-0";

        // if 'negative' is hit after 'calculate' than a new calculation should begin  
        } else if (previousKeyType === 'calculate') {
            allClear();
            display.textContent = "-0";
        } else if (displayedNum.includes('-')) {
            display.textContent = displayedNum.replace('-', '');
        } else {
            display.textContent = '-' + displayedNum;
        }

        calculator.dataset.previousKeyType = 'negative';
    }

    // if (action === 'root') {
    //     const value = display.textContent;

    //     calculator.dataset.operator = action;
    //     calculator.dataset.previousKeyType = 'root';

    //     if (value.includes('-')) {
    //         display.textContent = 'Error';
    //         return;
    //     };
    //     const calcValue = Math.sqrt(value);
    //     display.textContent = calcValue;
    //     calculator.dataset.firstValue = calcValue;
    // }

})