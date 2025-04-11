function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export function getCat() {

    let cats = window.localStorage.getItem("cats");
    if (cats) {
        cats = JSON.parse(cats);
    } else {
        // Init
        cats = {
            expense: ["Food", "Transport", "Gathering", "Gift", "Housing", "Tax", "Travel", "Daily", "Education", "Beauty", "Entertainment", "Pet", "Medical", "Other Expenses"],
            income: ["Salary", "Gift", "Investment", "Part Time", "Rental Income", "Other Income"],
        }
    }

    return cats;
}

export function updateCat(newCat) {
    window.localStorage.setItem("cats", JSON.stringify(newCat));
}


export function saveTransaction (category, subCategory, amount, notes, date) {
    console.log(category, subCategory, amount, notes, date);
    console.log(window.db);
    var request = window.indexedDB.open("mainDB", 1);
    request.onsuccess = () => {
        const db = request.result;
        const store = db.transaction("transactions", "readwrite").objectStore("transactions");
        const req = store.add({
            id: generateUUID(), category, subCategory, amount, notes, date
        });
        req.onsuccess = () => {
            alert(`Transaction saved!\nCategory: ${category}\nSubcategory: ${subCategory}\nAmount: $${amount}\nNote: ${notes}`);
        };
    }
}


export function getTransactions(todo) {

    var request = window.indexedDB.open("mainDB", 1);
    request.onsuccess = () => {
        const db = request.result;
        const store = db.transaction("transactions", "readonly").objectStore("transactions");
        const getReq = store.getAll();
        getReq.onsuccess = (e) => {
            console.log(e.target.result);
            todo(e.target.result)
            return e.target.result;
        }
    }
}