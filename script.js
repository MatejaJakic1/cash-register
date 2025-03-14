let price = 3.26;
let cid =
    [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

let currency = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];


const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const totalDisplay = document.getElementById("total");
const cidDisplay = document.getElementById("cid");

const displayCurrencyText = (str) => {
    const words = str.toLowerCase().split(' ');
    let result = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word === "one" && i + 1 < words.length && words[i + 1] === "hundred") {
            continue;
        }
        if (word.endsWith('y')) {
            result.push(word.charAt(0).toUpperCase() + word.slice(1, -1) + 'ies');
        } else {
            result.push(word.charAt(0).toUpperCase() + word.slice(1) + 's');
        }
    }
    return result.join(' ');
};


totalDisplay.innerText = `Total: $${price}`;
cidDisplay.innerHTML = `<strong>Change in drawer:</strong><br>${cid.map(([name, amount]) => `${displayCurrencyText(name)}: $${amount.toFixed(2)}`).join('<br>')}`;

purchaseBtn.addEventListener("click", () => {
    if (checkIfValid()) {
        calculateDue();
    }
    cashInput.value = "";
})


const checkIfValid = () => {
    const cash = parseFloat(cashInput.value);
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return false;
    } else if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return false;
    } else {
        return true;
    }

}


const calculateDue = () => {
    const cash = parseFloat(cashInput.value).toFixed(2);
    let due = parseFloat(cash - price).toFixed(2);
    let change = [];
    let totalCid = cid.reduce((acc, el) => acc + el[1], 0);

    if (parseFloat(due) > parseFloat(totalCid)) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    if (parseFloat(due) === parseFloat(totalCid)) {
        changeDue.textContent = "Status: CLOSED";
        let result = cid.map(([name, amount]) => amount > 0 ? `${name}: $${amount.toFixed(2)}` : null).filter(Boolean).join(' ');
        changeDue.textContent += ` ${result}`;
        return;
    }

    for (let i = cid.length - 1; i >= 0; i--) {
        let [denomination, total] = cid[i];
        const denomValue = currency[i][1];
        let currentChange = 0;

        while (due >= denomValue && total > 0) {
            due = (due - denomValue).toFixed(2);
            total -= denomValue;
            currentChange += denomValue;
        }

        if (currentChange > 0) {
            change.push([denomination, currentChange]);
            cid[i][1] -= currentChange;
        }
    }

    if (parseFloat(due) > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    changeDue.innerHTML = "Status: OPEN<br>";
    changeDue.innerHTML += `${change.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join('<br>')}`;
    cidDisplay.innerHTML = `Change in drawer:<br>${cid.map(([name, amount]) => `${toTitleCase(name)}: $${amount.toFixed(2)}`).join('<br>')}`;
}







