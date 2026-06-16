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

appilix.postMessage(JSON.stringify({
    type: "update_settings",
    updates: {
        modules: {
            app_bar: {
                settings: {
                    bg_color: {
                        light: "#186E62",
                        dark: "#186E62"
                    },
                    title_color: {
                        light: "#ffffff",
                        dark: "#ffffff"
                    },
                    default_title: "Mathlify Academy"
                }
            }
        }
    }
}));



appilix.postMessage(JSON.stringify({
    type: "update_settings",
    updates: {
        modules: {
            app_bar: {
                settings: {
                    bg_color: {
                        light: "#ee4b2b",
                        dark: "#ee4b2b"
                    },
                    title_color: {
                        light: "#ffffff",
                        dark: "#ffffff"
                    },
                    default_title: "About"
                }
            }
        }
    }
}));


appilix.postMessage(JSON.stringify({
    type: "update_settings",
    updates: {
        modules: {
            app_bar: {
                settings: {
                    bg_color: {
                        light: "#000000",
                        dark: "#000000"
                    },
                    title_color: {
                        light: "#ffffff",
                        dark: "#ffffff"
                    },
                    default_title: "Services"
                }
            }
        }
    }
}));

appilix.postMessage(JSON.stringify({
    type: "update_settings",
    updates: {
        modules: {
            app_bar: {
                settings: {
                    bg_color: {
                        light: "#0000ff",
                        dark: "#0000ff"
                    },
                    title_color: {
                        light: "#ffffff",
                        dark: "#ffffff"
                    },
                    default_title: "Contact"
                }
            }
        }
    }
}));