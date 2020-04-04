'use strict'

const numBtn = document.querySelectorAll('.num-btn'); //number
const operations = document.querySelectorAll('.ops'); //operation
const dotBtn = document.querySelector('.dot-btn'); //decimal
const clearBtn = document.querySelector('.clear-btn'); //c / ce
const resultBtn = document.querySelector('.equals')
const displayCalc = document.querySelector('.display');
const squareDegree = document.getElementById("square-degree");
const squareRoot = document.getElementById("square-root");
const module = document.getElementById("module");
const cube = document.getElementById("cube");
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


for (let i=0; i<numBtn.length; i++) {
    let number = numBtn[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}


for (let i=0; i<operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}


//==================================================================

module.addEventListener('click', () => {       //
    let memory = displayCalc.value;
    displayCalc.value = Math.abs(memory);
})

squareDegree.addEventListener('click', () => {       //квадрат
    let memory = displayCalc.value;
    displayCalc.value = Math.pow(memory, 2);
})

squareRoot.addEventListener('click', () => {    //корінь
    let memory = displayCalc.value;
    displayCalc.value = Math.sqrt(memory);
})

cube.addEventListener('click', () => {
    let memory = displayCalc.value;
    displayCalc.value = Math.pow(memory, 3);
})

dotBtn.addEventListener('click', dotButton);

clearBtn.addEventListener('click', clear);


//==================================================================
function numberPress(number) {
    if (MemoryNewNumber) {
        displayCalc.value = number;
        MemoryNewNumber = false;
    } else {
        if (displayCalc.value === '0') {
            displayCalc.value = number;
        } else {
            displayCalc.value += number;
        }
    };

}

function operation(opr) {
    let localOprMemory = displayCalc.value; //=======добавив let

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        displayCalc.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOprMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOprMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOprMemory);
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber /= parseFloat(localOprMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOprMemory);
        }
        if(!isFinite(MemoryCurrentNumber)) {
            alert('Операція неможлива!');
        }
        displayCalc.value = MemoryCurrentNumber;
        MemoryPendingOperation = opr;
    }

}

function clear() {
        displayCalc.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';


    console.log('click on button with clear!');
}

function dotButton() {
    let localDotMemory = displayCalc.value;

    if (MemoryNewNumber) {
        localDotMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDotMemory.indexOf('.') === -1) {
            localDotMemory += '.';
        };
    };

    displayCalc.value = localDotMemory;
}
