// ===============================
// ✅ Load expences from localStorage
// ===============================
let expences = JSON.parse(localStorage.getItem("expencesData")) || [];

// ✅ Variable to hold which expence is being edited
let editIndex = null;

// ===============================
// 🔹 Save to localStorage
// ===============================
function saveToLocalStorage() {
    localStorage.setItem("expencesData", JSON.stringify(expences));
}

// ===============================
// 🔹 Display all expences in table
// ===============================
function displayExpences() {
    const tableBody = document.querySelector("#expencesTable tbody");
    tableBody.innerHTML = ""; // clear table first

    let totalMoney = 0;

    expences.forEach((exp, index) => {
        totalMoney += exp.expencesTk;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>৳${exp.expencesTk}</td>
            <td>${exp.date}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("total__money").innerText = `Total Expences: ৳${totalMoney}`;
}

// ===============================
// 🔹 Add new expence
// ===============================
document.getElementById("studentForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const expencesTk = Number(document.getElementById("expencesTk").value);
    if (!expencesTk) return alert("Please fill all fields!");

    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const newExpence = { expencesTk, date: formattedDate };

    if (editIndex === null) {
        expences.push(newExpence);
    } else {
        expences[editIndex] = newExpence;
        editIndex = null;
        document.querySelector(".add").textContent = "Add Expence";
    }

    saveToLocalStorage();
    displayExpences();
    document.getElementById("studentForm").reset();
});

// ===============================
// 🔹 Delete last expence
// ===============================
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", () => {
    if (expences.length === 0) {
        alert("⚠️ No expence left to delete!");
        return;
    }

    if (confirm("⚠️ Are you sure you want to delete last expence?")) {
        expences.pop();
        saveToLocalStorage();
        displayExpences();
    }
});

// ===============================
// 🔹 Restart / Delete all expences
// ===============================
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
    if (expences.length === 0) return;

    if (confirm("⚠️ Are you sure you want to delete all expences?")) {
        expences = [];
        localStorage.removeItem("expencesData");
        displayExpences();
        alert("✅ All expences cleared!");
    }
});

// ===============================
// ✅ Initial display
// ===============================
displayExpences();

