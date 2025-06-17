// this .mjs will handle event listeners and dropdown toggles
function mainMenuHamburger(ev) {
    // toggle the show class on global-nav
    document.querySelector(".global-nav").classList.toggle("show");

    // check to see if target is the button or something inside the button
    if (ev.target.tagName != "BUTTON") {
        ev.target = ev.target.closest("button");
    }

    // check to see if we just opened or closed the menu
    if (document.querySelector(".global-nav").classList.contains("show")) {
        // if we opened it then set the aria-expanded attribute on button to true
        ev.target.setAttribute("aria-expanded", true);
    } else {
        // if we closed the button, set the aria-expanded attribute to false
        ev.target.setAttribute("aria-expanded", false);
    }
    console.log("toggle");
}

function innerMenuToggle(ev) {
    const target = ev.currentTarget;

            // find associated dropdown menu
            const dropdown = target.parentElement.nextElementSibling;
            const isOpen = target.getAttribute("aria-expanded") === "true";

            // update aria=expanded
            target.setAttribute("aria-expanded", !isOpen);
            // toggle dropdown visibility
            dropdown.classList.toggle("show");
}

export function toggleMenu() {
    // get menu buttons
    const mainButton = document.querySelector("#global-nav-toggle");
    const dropdownMenu = document.querySelectorAll(".global-nav__split-button__toggle");

    // when mainButton is clicked
    mainButton.addEventListener("click", mainMenuHamburger);
    dropdownMenu.forEach((button) => {
        button.addEventListener("click", innerMenuToggle);
    });
}
toggleMenu();