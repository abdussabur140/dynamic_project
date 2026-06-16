document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav_items_full_screen a");

    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});



// Hamburger Logic

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile_view_nav");

let isOpen = false;

// Toggle menu on click
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    menu.classList.toggle("active");
    isOpen = !isOpen;

    if (isOpen) {
        hamburger.src = "project_img/close_button.svg";
    } else {
        hamburger.src = "project_img/hamburger.svg";
    }
});

// Close when clicking outside
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove("active");
        hamburger.src = "project_img/hamburger.svg";
        isOpen = false;
    }
});