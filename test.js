const keys = document.querySelector('.calculator');
const display = document.querySelector('.display');

keys.addEventListener('click', e => {
    
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action

        if (!action) {
            console.log(key.textContent)
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            console.log(key.textContent)
        }

        if (action === 'decimal') {
            console.log(key.textContent)
        }
          
        if (action === 'all-clear') {
            console.log(key.textContent)
        }
          
        if (action === 'calculate') {
            console.log(key.textContent)
        }
    }
})