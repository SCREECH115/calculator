const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const getResult = document.querySelector('.getResult')
const deleteNumber = document.querySelector('.delete')
const beforeResult = document.querySelector('.before-result')
const actualResult = document.querySelector('.actual-result')

let actualNumber = ''
let beforeNumber = ''
var operation = undefined

const calculate = () => {
    let calculating
    if(!beforeNumber || !actualNumber){
        return
    }

    const before = parseFloat(beforeNumber)
    const actual = parseFloat(actualNumber)

    if(isNaN(before) || isNaN(actual)){
        return
    }

    switch (operation) {
        case '+':
            calculating = before + actual
            break;
        case '-':
            calculating = before - actual
            break;
        case '×':
            calculating = before * actual
            break;
        case '÷':
            if(actual === 0){
                clearResult()
                return
            }
            calculating = before / actual
            break;
        case '√':
            calculating = Math.pow(before, 1/actual)
            break;
        case '%':
            calculating = before / 100 * actual
            break;
        case '^':
            calculating = Math.pow(before, actual)
            break;
        case 'log':
            calculating = Math.log(before) / Math.log(actual)
            break;
        default:
            return
    }
    actualNumber = calculating
    operation = undefined
    beforeNumber = ''
}

const selectOperator = (operator) => {
    if(actualNumber === ''){
        return
    }
    if(beforeNumber !== ''){
        const before = beforeResult.innerText
        if(actualNumber.toString() === '0' && before[before.length-1] === '÷'){
            clearResult()
            return
        }
        calculate()
    }
    operation = operator
    beforeNumber = actualNumber
    actualNumber = ''
}

const uptadeResult = () => {
    actualResult.innerText = actualNumber
    if(operation != null){
        beforeResult.innerText = beforeNumber + operation   
    } else {
        beforeResult.innerText = ''
    }
}

const addNumber = (number) => {
    if(number === '•'){
        if(actualNumber.includes('.')){
            return
        }
        number = '.'
    }
    actualNumber = actualNumber.toString() + number.toString()
}

const deleteN = () => {
    actualNumber = actualNumber.toString().slice(0, -1)
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        uptadeResult()
    })
})

deleteNumber.addEventListener('click', () => {
    deleteN()
    uptadeResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        selectOperator(operator.innerText)
        uptadeResult()
    })
})

getResult.addEventListener('click', () => {
    calculate()
    uptadeResult()
})

const clearResult = () =>{
    actualNumber = ''
    beforeNumber = ''
    operation = undefined
}

clear.addEventListener('click', () => {
    clearResult()
    uptadeResult()
})