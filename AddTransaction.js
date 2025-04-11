import {getCat, getTransactions, saveTransaction} from "./dataprocess.js";

const cats = getCat();
const expenseCategories = cats.expense;
const incomeCategories = cats.income;

let selectedCategory = "Expenses";
let selectedSubcategory = "";
let currentAmount = 0;
let currentNote = "";
let transactions = [];

function selectCategory(category) {
    selectedCategory = category;
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === category) {
            btn.classList.add("active");
        }
    });

    var subcategories;
    if (category === "Expenses") {
        subcategories = expenseCategories;
    } else {
        subcategories = incomeCategories;
    }
    var subcategoryContainer = document.getElementById("subcategories");
    subcategoryContainer.innerHTML = "";
    subcategories.forEach(sub => {
        var btn = document.createElement("button");
        btn.classList.add("subcategory-btn");
        btn.textContent = sub;
        btn.onclick = () => selectSubcategory(sub);
        subcategoryContainer.appendChild(btn);
    });
    selectedSubcategory = "";
}

function selectSubcategory(subcategory) {
    selectedSubcategory = subcategory;
    document.querySelectorAll(".subcategory-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === subcategory) {
            btn.classList.add("active");
        }
    });

    // document.getElementById("calculatorModal").style.display = "block";
    // document.getElementById("modalOverlay").style.display = "block";
}

let displayValue = "0";

function appendToDisplay(value) {
    if (displayValue === "0" && value !== "." && !isNaN(value)) {
        displayValue = value;
    } else if (displayValue === "Error") {
        displayValue = value;
    } else {
        displayValue += value;
    }
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "0";
    document.getElementById("display").value = displayValue;
}

function calculate() {
    try {
        let expression = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
        displayValue = eval(expression).toString();
        if (displayValue === "Infinity" || displayValue === "-Infinity") {
            throw new Error("Division by zero");
        }
        if (displayValue.includes('.')) {
            displayValue = parseFloat(displayValue).toFixed(4);
        }
        document.getElementById("display").value = displayValue;
    } catch (e) {
        displayValue = "Error";
        document.getElementById("display").value = displayValue;
        setTimeout(clearDisplay, 1000);
    }
}

function closeModal() {
    // document.getElementById("calculatorModal").style.display = "none";
    // document.getElementById("modalOverlay").style.display = "none";
}

function setAmount() {
    if (!selectedSubcategory) {
        alert("Please select a subcategory!");
        return;
    }
    currentAmount = parseFloat(displayValue) || 0;
    currentNote = document.getElementById("note").value || "";

    const transaction = {
        category: selectedCategory,
        subcategory: selectedSubcategory,
        amount: currentAmount,
        notes: currentNote,
        date: (new Date()).valueOf(),
    };
    transactions.push(transaction);

    console.log("Transactions:", transactions);
    document.getElementById("amount").value = "$" + currentAmount.toFixed(2);

    saveTransaction(...Object.values(transaction));

    currentAmount = 0;
    currentNote = "";
    document.getElementById("note").value = "";
    selectedSubcategory = "";
    document.querySelectorAll(".subcategory-btn").forEach(btn => btn.classList.remove("active"));
    clearDisplay();
    closeModal();
}

window.addEventListener("DOMContentLoaded", function() {
    selectCategory("Expenses");
    document.querySelector("#SetAmountBtn").onclick = setAmount;
    document.querySelector("#expenses-btn").onclick = () => selectCategory("Expenses");
    document.querySelector("#income-btn").onclick = () => selectCategory("Income");

    ["7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    "0", "00", ".",
    "+", "-", "*", "/"].forEach((i) => {
        let ele = document.createElement("button");
        ele.textContent = i;
        ele.onclick = () => appendToDisplay(i);

        document.querySelector("#numpad").appendChild(ele);
    })
    document.querySelectorAll(".calculator-btn")

    document.querySelector("#equals-btn").onclick = calculate;
    document.querySelector("#clear-btn").onclick = clearDisplay;
    document.querySelector("#getData").onclick = getTransactions;
});