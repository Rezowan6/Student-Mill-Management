const menuIcon = document.getElementById("menu__icon");
const menu = document.getElementById("menu");
const mainFrom = document.querySelector(".mainContent");
const items = document.querySelectorAll(".item");

// ✅ Menu toggle
menuIcon.addEventListener("click", () => {
    menu.classList.toggle("contronResponsive");

    const isOpen = menuIcon.classList.contains("fa-bars-staggered");

    if (isOpen && !mainFrom.classList.contains("blur-active")) {
        menuIcon.classList.replace("fa-bars-staggered", "fa-x");
        mainFrom.classList.add("blur-active");
    } else {
        menuIcon.classList.replace("fa-x", "fa-bars-staggered");
        mainFrom.classList.remove("blur-active");
    }
    });

    // ✅ Menu item click করলে blur ও menu বন্ধ হবে
    items.forEach((e) => {
    e.addEventListener("click", () => {
        mainFrom.classList.remove("blur-active");
        menu.classList.add("contronResponsive");
        menuIcon.classList.replace("fa-x", "fa-bars-staggered");
    });
});