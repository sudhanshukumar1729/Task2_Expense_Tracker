const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('form');
const amount = document.getElementById('amount');



const localStorageTransactions = JSON.parse(localStorage

    .getItem('transactions'));

let transactions  = localStorage.getItem('transactions') !== null ?
localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();

    if(item.value.trim() === '' || amount.value.trim() === ''){
        alert("Please add a item and amount");
    }
    else {
        const transaction = {
            id : generateID(),
            item : item.value,
            amount : +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValues();
        updateLocalStorage();

        item.value ='';
        amount.value ='';
    }
} 
function generateID(){
    return Math.floor(Math.random() * 100000);
}

function addTransactionDOM(transaction) {
    
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ?'minus' : 'plus');

    item.innerHTML = `
        ${transaction.item} <span>${sign}${Math.abs(transaction.amount)}
        </span> <button class = "delete-btn" onClick ="removeTransaction(${transaction.id})">x</button>`;
        
        list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total  = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2); 
    
    const income = amounts.filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
    const expense  = (
        amounts.filter(item => item < 0) 
        .reduce((acc, item) =>(acc += item), 0) * -1).toFixed(2);

    balance.innerHTML = `₹${total}`;
    
}
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id
        !== id);
        updateLocalStorage();
        init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);