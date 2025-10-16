
// ✅ Loading data from localStorage (if any)
let students = JSON.parse(localStorage.getItem("studentsData")) || [];

// ✅ Variable to hold which student is being edited
let editIndex = null;

/* ==========================================================
    🔹 Function to save data to localStorage
   ========================================================== */
function saveToLocalStorage() {
    localStorage.setItem("studentsData", JSON.stringify(students));
}


/* ==========================================================
    🔹 Function to show all students in the main table
   ========================================================== */
function displayStudents(filter = "") {
    const table = document.getElementById("studentTable");
    // Setting table headers
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Student Tk</th>
            <th>Date</th>
        </tr>
    `;

    totalMoney = 0;

    // filter According to student list create
    let filteredStudents = students
    .map((s, i) => ({ ...s, realIndex: i }))
    .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));


        // Every student is shown in the table
    filteredStudents.forEach((student, index) => {
        totalMoney += student.studentTk;


        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>৳${student.studentTk}</td>
                <td>${student.date}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
    // Total amount display
    document.getElementById("total__money").innerText = `Total Money: ৳${totalMoney}`;
}

/* ==========================================================
    🔹 Adding/updating new students
   ========================================================== */
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentTk = Number(document.getElementById("studentTk").value);
    // setting date
    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });


    if (!name || !studentTk) return alert("Please fill all fields!");

    const newStudent = {
        name,
        studentTk,
        date: formattedDate,
    };

    // Adding a new student or updating an old one
    if (editIndex === null) {
        students.push(newStudent);
    } else {
        students[editIndex] = newStudent;
        editIndex = null;
        document.querySelector(".add").textContent = "Add Student";
    }

    saveToLocalStorage();
    displayStudents();
    document.getElementById("studentForm").reset();
});


/* ==========================================================
    🔹 Search by name
   ========================================================== */
document.getElementById("searchInput").addEventListener("input", function () {
    const filter = this.value;
    displayStudents(filter);
});


const checkboxes = document.querySelectorAll('input[name="amount"]');
const customInput = document.getElementById('studentTk');

checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        if (box.checked) {
        checkboxes.forEach(c => {
            if (c !== box) c.checked = false;
        });
        
        customInput.value = box.value;
        } else {
        customInput.value = "";
        }
    });
});




/* ==========================================================
    🔹 Function to delete student
   ========================================================== */
const deleteBtn = document.getElementById("deleteBtn");
const restartBtn = document.getElementById("restartBtn");

// 🔹 Delete Last Student
deleteBtn.addEventListener("click", () => {
    if (students.length === 0) {
        alert("⚠️ No student left to delete!");
        return;
    }

    if (confirm("⚠️ Are you sure you want to delete last student?")) {
        students.pop();
        saveToLocalStorage();
        displayStudents();
    }
});

// 🔹 Restart (Delete All Students)
restartBtn.addEventListener("click", () => {
    if (students.length === 0) return; // ❌ No data? Then do nothing.

    if (confirm("⚠️ Are you sure you want to delete all students?")) {
        localStorage.removeItem("studentsData");
        students = [];
        displayStudents();
        alert("✅ All student data cleared!");
    }
});


displayStudents();