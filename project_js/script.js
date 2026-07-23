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





// For app bar backgoround color changes dynamically within the appilix app.

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();

    const appBarConfig = {
        "index.html": {
            bg: "#00ff00",
            title: "Mathlify Academy"
        },
        "about.html": {
            bg: "#ff0000",
            title: "About"
        },
        "services.html": {
            bg: "#0000ff",
            title: "Services"
        },
        "contact.html": {
            bg: "#000000",
            title: "Contact"
        }
    };

    const config = appBarConfig[currentPage];

    if (config && typeof appilix !== "undefined") {
        appilix.postMessage(JSON.stringify({
            type: "update_settings",
            updates: {
                modules: {
                    app_bar: {
                        settings: {
                            bg_color: {
                                light: config.bg,
                                dark: config.bg
                            },
                            title_color: {
                                light: "#ffffff",
                                dark: "#ffffff"
                            },
                            default_title: config.title
                        }
                    }
                }
            }
        }));
    }
});



// Vibration Function

function appilixVibrationPattern() {
    if (typeof appilix === "undefined") {
        console.warn("Appilix JS Bridge is not available.");
        return;
    }

    appilix.postMessage(JSON.stringify({
        type: "vibrate",
        props: {
            pattern: [200, 100, 200, 100, 500]
        }
    }));
}