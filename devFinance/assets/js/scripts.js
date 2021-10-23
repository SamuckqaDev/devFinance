//Open and close modal;

const Modal = {
  open() {
    //Open modal;
    // add class active to modal;
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //Close modal;
    //remove class active to modal;
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

//objects Table transactions;
const transactions = [
  {
    id: 1,
    description: "Site Development",
    amount: 500000,
    createAt: "23/01/2021",
  },
  {
    id: 2,
    description: "RocketSeat",
    amount: -21800,
    createAt: "23/01/2021",
  },
  {
    id: 3,
    description: "driver's license",
    amount: -150000,
    createAt: "23/01/2021",
  },
 
];

const Transaction = {
  all: transactions,
  add(transaction){
    Transaction.all.push(transaction)
  },
  incomes() {
    let income = 0;
    //Sum incomes;

    //get all transactions;
    Transaction.all.forEach((transaction) => {
      // if > 0 ;
      //verify if transaction > 0;
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    // sum an variable and return;
    return income;
  },
  outcomes() {
    //Sum outcomes;
    let outcome = 0;
    //Sum incomes;

    //get all transactions;
    Transaction.all.forEach((transaction) => {
      // if < 0 ;
      //verify if transaction < 0;
      if (transaction.amount < 0) {
        outcome += transaction.amount;
      }
    });
    // sum an variable and return;
    return outcome;
  },
  total() {
    //Total = incomes - outcomes;
    let total = Transaction.incomes() + Transaction.outcomes();
    return total;
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addTransaction(transaction, index) {
    console.log(transaction);
    //Create Element through DOM;
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "outcome";

    const amount = Utils.formatCurrency(transaction.amount);

    //Create element and list information trough variables;
    const html = `  
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">R$ ${amount}</td>
      <td class="date">${transaction.createAt}</td>
      <td>
       <img src="./assets/img/minus.svg" alt="Remove transaction" />
      </td>
   `;

    return html;
  },
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("outcomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.outcomes()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
};

const Utils = {
  //Format type amount;
  formatCurrency(value) {
    //Add signal according to ammount;
    const signal = Number(value) < 0 ? "-" : "";
    //Replace value to empty-space;
    value = String(value).replace(/\D/g, "");

    //Convert to number and split to 'oneHundred';
    value = Number(value) / 100;

    //Convert number value to 'pt-br' with toLocaleString();
    value = value.toLocaleString("pt-br", {
      style: "currency", //Properties toLocaleString();
      currency: "BRL", //Type amount;
    });
    return signal + value;
  },
};

const App = {
  init(){
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    })
    
  }, 
  reload(){

  }
}


DOM.updateBalance();

App.init()


//Set the current year;
const year = document.getElementById("date");
const newDate = new Date();
year.innerHTML = newDate.getFullYear();

