import {getCat, getTransactions, saveTransaction} from "./dataprocess.js";


window.addEventListener("DOMContentLoaded", () => {
    let addBtn = document.querySelector("#addBtn");
    addBtn.onclick = () => {
        console.log("test")
        document.querySelector("#addTransaction-box").classList.toggle("hidden");
    }

    let reloadBtn = document.querySelector("#reloadBtn");
    reloadBtn.onclick = () => {
        console.log("test")
        getTransactions(todo);
    };

    let container = document.querySelector("#record-container");

    let todo = (transactions) => {
        container.childNodes.forEach(child => container.removeChild(child));

        transactions.forEach(transaction => {
            let record = document.createElement("div");
            record.innerHTML = `
<p>${transaction.category}-${transaction.subCategory}</p>
<span class="count">$${transaction.amount}</span>
`;
            record.classList.add("record");
            container.appendChild(record);

        })
    }

    getTransactions(todo);

});