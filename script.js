

let date4check = new Date();

let day = date4check.getDate();
let month = date4check.getMonth();
let year = date4check.getFullYear();

let lastDayOfMonth = new Date(year, month + 1, 0).getDate();

if (day === lastDayOfMonth) {
  let monthinsights = null ;
  if(month == 3 || month == 7 || month == 11 ){
    monthinsights= []
  }
  else{
    monthinsights= JSON.parse(localStorage.getItem("MonthsInsights"))
  }
  let total_expense = 0;
  
  let data_expense = JSON.parse(localStorage.getItem("Expenses")) || {};
  if (!(data_expense == {})) {
    for (let key in data_expense) {
      total_expense += data_expenses[key].reduce((acc, cur) => acc + cur, 0);
      data_expense[key] = [0];
    }
    let income = JSON.parse(localStorage.getItem("Income"));
    let saving = (100 - (total_expense * 100) / income).toFixed(2);
    monthinsights.push({month:(month+1),income:income, expenses:total_expense,saving:saving});
    localStorage.setItem("MonthsInsights",JSON.stringify(monthinsights));
    localStorage.setItem("Expenses", JSON.stringify(data_expense));
    localStorage.setItem("Income", JSON.stringify(0));
  }
}

const income_popup_btn = document.getElementById("show-income-btn");
const expense_popup_btn = document.getElementById("show-expense-btn");
const category_popup_btn = document.getElementById("show-category-btn");
const expense_popup = document.getElementById("Add-Expense-Popup");
const income_popup = document.getElementById("Add-Income-Popup");
const category_popup = document.getElementById("Add-Category-Popup");
const error_popup = document.getElementById("error-Popup");
const error_para = document.getElementById("error-para");
const error_popup_btn = document.getElementById("error-close-btn");
const success_popup = document.getElementById("success-popup");
const success_para = document.getElementById("success-para");
const toggleBtn = document.getElementById("menu-toggle");
let category_chart = null;
let IvsE_chart = null;
function saveExpenseLogs(category, amount) {
  let logs = JSON.parse(localStorage.getItem("LogsExpenses")) || [];
  let date = new Date();
  logs.push({
    category: category,
    date:
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) + // No need for Number() wrapper once executed
      "/" +
      date.getDate() + // Fixed: Changed from getDay() to getDate()
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds(),
    amount: amount,

  });
  localStorage.setItem("LogsExpenses", JSON.stringify(logs));
}
function saveIncomeLogs(amount) {
  let logs = JSON.parse(localStorage.getItem("LogsIncome")) || [];
  let date = new Date();
  logs.push({
    date:
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) + // No need for Number() wrapper once executed
      "/" +
      date.getDate() + // Fixed: Changed from getDay() to getDate()
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds(),
    amount: amount,

  });
  localStorage.setItem("LogsIncome", JSON.stringify(logs));
}
function saveCategoryLogs(name) {
  let logs = JSON.parse(localStorage.getItem("LogsCategory")) || [];
  let date = new Date();
  logs.push({
    name: name,
    date:
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) + // No need for Number() wrapper once executed
      "/" +
      date.getDate() + // Fixed: Changed from getDay() to getDate()
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds(),
  });
  localStorage.setItem("LogsCategory", JSON.stringify(logs));
}
// FIX 1: Ensure initialization consistently treats expenses as an object
let data_expenses = JSON.parse(localStorage.getItem("Expenses")) || {};
let data_categories = JSON.parse(localStorage.getItem("Categories")) || [];
let data_income = JSON.parse(localStorage.getItem("Income")) || 0;
function updateChart() {
  const data_expenses = JSON.parse(localStorage.getItem("Expenses")) || {};
  const dataset = [];

  for (let key in data_expenses) {
    // Ensure we are working with an array and it actually has data
    if (Array.isArray(data_expenses[key]) && data_expenses[key].length > 0) {
      // Calculate the total for just this specific category
      const categoryTotal = data_expenses[key].reduce(
        (acc, cur) => acc + cur,
        0,
      );

      // FIX: Wrap categoryTotal in an array brackets []
      dataset.push(categoryTotal);
    }
  }

  return dataset; // Make sure to return it if this is inside updateChart()
}
function updatedashboard() {
  data_income = JSON.parse(localStorage.getItem("Income")) || 0;
  // FIX 2: Changed fallback from [] to {} so it stays an object
  data_expenses = JSON.parse(localStorage.getItem("Expenses")) || {};

  let total_expense = 0;

  for (let key in data_expenses) {
    // Ensure we are working with an array before reducing
    if (Array.isArray(data_expenses[key])) {
      total_expense += data_expenses[key].reduce((acc, cur) => acc + cur, 0);
    }
  }

  document.getElementById("balance-para").textContent =
    data_income - total_expense;

  document.getElementById("income-para").textContent = data_income;
  document.getElementById("expense-para").textContent = total_expense;

  document.getElementById("saving-para").textContent =
    data_income > 0
      ? (100 - (total_expense * 100) / data_income).toFixed(2)
      : 0;

  if (category_chart) {
    category_chart.destroy();
  }
  if (IvsE_chart) IvsE_chart.destroy();
  category_chart = new Chart(document.getElementById("category"), {
    type: "bar",
    data: {
      labels: data_categories,
      datasets: [
        {
          label: "Expenses",
          data: updateChart(),
          backgroundColor: [
            "#36a2eb", // Color for bar 1 (Food)
            "#ff6384", // Color for bar 2 (Clothes)
            "#ffce56", // Color for bar 3...
            "#cc65fe",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      // ADD THIS PLUGINS CONFIGURATION TO HIDE THE TOP LEGEND
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  IvsE_chart = new Chart(document.getElementById("IncomevsExpense"), {
    type: "pie",
    data: {
      labels: ["Total Revenue", "Total Expenditures"],
      datasets: [{ label: "", data: [data_income, total_expense] }],
    },
  });
}

updatedashboard();

category_popup_btn.addEventListener("click", () => {
  category_popup.style.display = "inline";
  income_popup.style.display = "none";
  expense_popup.style.display = "none";
});

income_popup_btn.addEventListener("click", () => {
  income_popup.style.display = "inline";
  expense_popup.style.display = "none";
  category_popup.style.display = "none";
});

expense_popup_btn.addEventListener("click", (e) => {
  if (
    !JSON.parse(localStorage.getItem("Categories")) ||
    JSON.parse(localStorage.getItem("Categories")).length === 0
  ) {
    error_para.textContent =
      "There Is No Category\nYou Must Add A Category First ";
    document.getElementById("modal-overlay").style.display = "block";
    error_popup.style.display = "inline";
  } else {
    expense_popup.style.display = "inline";
    income_popup.style.display = "none";
    category_popup.style.display = "none";
    let select = document.getElementById("Categories");
    select.innerHTML = "";
    let categories = JSON.parse(localStorage.getItem("Categories"));
    let box = document.createDocumentFragment();
    for (let category of categories) {
      let option = document.createElement("option");
      option.setAttribute("value", category);
      option.textContent = category;
      box.appendChild(option);
    }
    select.appendChild(box);
  }
});

error_popup_btn.addEventListener("click", () => {
  error_popup.style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";
});

if (window.innerWidth <= 768) {
  document.body.classList.add("menu-hidden");
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("menu-hidden");
});
//POPUP WINDOW

category_popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-popup")) {
    category_popup.style.display = "none";
    document.getElementById("Category-input").value = "";
  }
  if (e.target.classList.contains("Add-bnt-pop")) {
    let value = document.getElementById("Category-input").value.trim();
    if (value.length > 0) {
      if (/^[a-zA-Z\s]+$/.test(value)) {
        // Added space support for category names
        if (!data_categories.includes(value)) {
          data_categories.push(value);
          localStorage.setItem("Categories", JSON.stringify(data_categories));

          data_expenses[value] = [0];
          localStorage.setItem("Expenses", JSON.stringify(data_expenses));

          category_popup.style.display = "none";
          document.getElementById("Category-input").value = "";
          saveCategoryLogs(value);
          success_para.textContent =
            "New category successfully created and added to your list";
          success_popup.style.display = "inline";
          document.getElementById("modal-overlay").style.display = "block";
          updatedashboard();
        } else {
          error_para.textContent = "Category Already Exists";
          document.getElementById("modal-overlay").style.display = "block";
          error_popup.style.display = "inline";
        }
      } else {
        error_para.textContent = "Must Be Only Text";
        document.getElementById("modal-overlay").style.display = "block";
        error_popup.style.display = "inline";
      }
    } else {
      error_para.textContent = "You must Fill The Field";
      document.getElementById("modal-overlay").style.display = "block";
      error_popup.style.display = "inline";
    }
  }
});

income_popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-popup")) {
    income_popup.style.display = "none";
  }
  if (e.target.classList.contains("Add-bnt-pop")) {
    let inputVal = document.getElementById("Income-input").value;
    if (inputVal.length) {
      if (Number(inputVal) > 0) {
        data_income += Number(inputVal);
        localStorage.setItem("Income", JSON.stringify(data_income));
        saveIncomeLogs(inputVal);
        success_para.textContent =
          "Income transaction successfully logged to your total revenue.";
        success_popup.style.display = "inline";
        document.getElementById("modal-overlay").style.display = "block";
        document.getElementById("Income-input").value = "";
        income_popup.style.display = "none";
        updatedashboard();
      } else {
        error_para.textContent =
          "The amount entered must be a positive number.";
        error_popup.style.display = "inline";
      }
    } else {
      error_para.textContent = "You must Fill The Field";
      error_popup.style.display = "inline";
    }
  }
});

expense_popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-popup")) {
    expense_popup.style.display = "none";
    document.getElementById("Expense-input").value = "";
  }
  if (e.target.classList.contains("Add-bnt-pop")) {
    let select = document.getElementById("Categories");
    let expenseInput = document.getElementById("Expense-input").value;

    if (expenseInput.length && Number(expenseInput) > 0) {
      // FIX 3: Safety check to initialize array if it somehow doesn't exist for this category
      if (!data_expenses[select.value]) {
        data_expenses[select.value] = [];
      }

      data_expenses[select.value].push(Number(expenseInput));
      localStorage.setItem("Expenses", JSON.stringify(data_expenses));

      document.getElementById("Expense-input").value = "";
      expense_popup.style.display = "none";
      success_para.textContent =
        "Expenditure successfully recorded and deducted from your balance";
      saveExpenseLogs(select.value, expenseInput);
      success_popup.style.display = "inline";
      document.getElementById("modal-overlay").style.display = "block";

      updatedashboard();
    } else {
      error_para.textContent = "You must enter a valid positive number";
      document.getElementById("modal-overlay").style.display = "block";
      error_popup.style.display = "inline";
    }
  }
});

success_popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("success-btn")) {
    success_popup.style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
  }
});
