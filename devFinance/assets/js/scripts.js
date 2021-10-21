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
    amount: 300000,
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
  incomes() {
    //Sum incomes;
  },
  outcomes() {
    //Sum outcomes;
  },
  total() {
    //Total = incoems - outcomes;
  },
};

const DOM = {
  addTransaction(transaction, index) {
    //create Element through DOM;
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction()
  },

  innerHTMLTransaction() {
    const html = `  
      <td class="description"></td>
      <td class="income">R$ 170,00</td>
      <td class="date">23/10/2021</td>
      <td>
       <img src="./assets/img/minus.svg" alt="Remove transaction" />
      </td>
   `;

   return html
  },
};

//Set the current year;
const year = document.getElementById("date");
const newDate = new Date();
year.innerHTML = newDate.getFullYear();
