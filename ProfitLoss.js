import {getTransactions} from "./dataprocess";

window.addEventListener("DOMContentLoaded", () => {

    console.log("test");

    let todo = (transaction) => {
        transaction.sort((a, b) => a.date - b.date);
        transaction.forEach(tr => {

            console.log(document.querySelector(`#${tr.subcategory}}`));
            document.querySelector(`#${tr.subcategory}}`).innerHTML = tr.amount;

        })
    }

    getTransactions(todo);

})

console.log("test");
