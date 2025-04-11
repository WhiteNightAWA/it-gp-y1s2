import {getCat, getTransactions, saveTransaction} from "./dataprocess.js";


window.addEventListener("DOMContentLoaded", () => {
    let addBtn = document.querySelector("#addBtn");
    addBtn.onclick = () => {
        console.log("test")
        document.querySelector("#addTransaction-box").classList.toggle("hidden");
    }

    let container = document.querySelector("#record-container");

    let todo = (transactions) => {
        container.childNodes.forEach(child => container.removeChild(child));

        transactions.sort((a, b) => b.date - a.date);

        transactions.forEach(transaction => {
            let record = document.createElement("div");
            record.innerHTML = `
${new Date(transaction.date).toLocaleString()}
<div class="record">
<h3>${transaction.category}-${transaction.subCategory}</h3>
<p>${transaction.notes}</p>
<span class="count">$${transaction.amount}</span>
</div>
`;
            record.classList.add("record-cont");
            container.appendChild(record);

        })
    }

    getTransactions(todo);

});