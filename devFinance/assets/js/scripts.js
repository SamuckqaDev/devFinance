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

//arry of objects Table transactions;
const transactions = [
  {
    description: "Site Development",
    amount: 500000,
    createAt: "23/01/2021",
  },
  {
    description: "RocketSeat",
    amount: -21800,
    createAt: "23/01/2021",
  },
  {
    description: "driver's license",
    amount: -150000,
    createAt: "23/01/2021",
  },
];

//Object Transaction;
const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
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

//Object DOM to render HTML;
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
  clearTransaction() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

//Object UTILS to store functions and corrections of code;
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

const Form = {
  description: document.querySelector("input#ipt_description"),
  amount: document.querySelector("input#ipt_amount"),
  date: document.querySelector("input#ipt_date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  formatData() {
    console.log("format Datas ");
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (description.trim() === "" || amount.trim() === "" || date.trim()) {
      throw new Error("Please, check all fileds ...");
    }
  },
  submit(event) {
    //Interrupt default behavior;
    event.preventDefault();

    try {
      //check if all fileds are filled;
      Form.validateFields();
    } catch (error) {
      alert(error.message)
    }

    //Format datas to save;
    Form.formatData();

    //save;

    //after save delete datas of  form and close modal;
    //update app;
  },
};

//Objectp APP to Inizialize and reload app while running;
const App = {
  //Initialize appliction;
  init() {
    //Add all transactions in HTML;
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });
    //Update card values;
    DOM.updateBalance();
  },
  reload() {
    //reload after add transactions;
    //clear DOM object to render new trasaction;
    DOM.clearTransaction();
    App.init();
  },
};

//App(Object) always goes last;
App.init();

//Set the current year;
const year = document.getElementById("date");
const newDate = new Date();
year.innerHTML = newDate.getFullYear();
