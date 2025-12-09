// initialize DOM elements/variables : pointing to HTML elements allowing us to manipulate them.
const balanceEl= document.getElementById("balance");
const incomeAmountEl=document.getElementById("income-amount");
const expenseAmountEl=document.getElementById('expense-amount');
const transactionListEl=document.getElementById('transaction-list');
const transactionFormEl=document.getElementById('transaction-form');
const descriptionEl=document.getElementById('description');
const amountEl=document.getElementById('amount');

// Get transactions stored in local storage and from local storage when refreshed the page
let transactions= JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener('submit',addTransaction);

function addTransaction(event){
    event.preventDefault(); // prevent form from submitting and refreshing the page(default behavior)

    //get form values
    const description = descriptionEl.value.trim(); //.trim() removes whitespace from both ends of a string
    const amount = parseFloat(amountEl.value); 

    transactions.push({
        id:Date.now(),
        description:description,
        amount:amount
    });

    /// add to local storage
    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset(); // clear form inputs
}   

function updateTransactionList(){
    transactionListEl.innerHTML=""; // clear existing list

    const sortedTransactions=[...transactions].reverse(); // reverse to show latest on top

    sortedTransactions.forEach((transaction)=>{
        const transactionEl=createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction){
    const li=document.createElement('li');
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');

    li.innerHTML=`
        <span>${transaction.description}</span>
        <span>
            ${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
        `;

    return li;
}

function updateSummary(){
    // 100 ,-50 , 200 , -200 = 100+(-50)+200+(-200)=50
    const balance = transactions.reduce((acc,transaction) => acc + transaction.amount,0);

    // Calculate income and expense
    const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc,transaction) => acc + transaction.amount,0);

    const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc,transaction) => acc + transaction.amount,0);

    // update UI
    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(amount){
    return new Intl.NumberFormat('en-US',{
        style:"currency",
        currency:"USD"
    }).format(amount);
}

function removeTransaction(id){
    transactions = transactions.filter((transaction) =>transaction.id!=id);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

//initial render i.e. when page loads
updateTransactionList();
updateSummary();