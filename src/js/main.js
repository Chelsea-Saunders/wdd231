import { 
    getParkData, 
    setHeaderFooter
} from "./parkService.mjs";
import "../css/style.css";
import "../css/partials/conditions.css";

// making "yell" the global parkCode...can be changed from here only then in each code...
// const urlParameters = new URLSearchParams(window.location.search);
// const parkCode = urlParameters.get("parkCode") || "yell"; // default to yellowstone 

// function that will create a component consisting of an image, headline and paragraph
function mediaCardTemplate(info) {
    return`
        <div class="media-card">
            <a href="${info.link || '#'}">
                <img src="${info.image}" alt="${info.altText || 'Image Description'}" class="media-card_img">
                <h3 class="media-card_title">${info.name}</h3>
                <p>${info.description}</p>
            </a>
        </div>`;
}
// functions for functions
function setParkIntro(data) {
    const mainIntro = document.querySelector(".intro");
    mainIntro.innerHTML = `<h2>${data.fullName}</h2><p>${data.description}</p>`;
}
function setParkInfo(links) {
    const mainInfo = document.querySelector(".info");
    // const cards = data.map(mediaCardTemplate);
    const cardsHTML = links.map(mediaCardTemplate).join("");

    // wrapping image links in a container
    mainInfo.innerHTML += `
        <div class="media-card-container">
            ${cardsHTML}
        </div>
    `;
}

// links to park information at bottom of page
function getInfoLinks(images) {
    return [
        {
            name: "Current Conditions",
            link: "#conditions",
            image: images[2]?.url || "",
            altText: images[2]?.altText || "Current conditions photo",
            description: "See road closures, trail conditions, and weather updates."
            },
            {
            name: "Fees & Passes",
            link: "#fees",
            image: images[3]?.url || "",
            altText: images[3]?.altText || "Fee and pass information",
            description: "Get information on entrance fees, passes, and permits."
            },
            {
            name: "Visitor Centers",
            link: "#centers",
            image: images[9]?.url || "images/default.jpg",
            altText: images[9]?.altText || "Visitor centers and services",
            description: "Find visitor centers, hours, and available services."
        }
    ];
}
function toggleMenu() {
    // get menu buttons
    const mainButton = document.querySelector("#global-nav-toggle");

    // when mainButton is clicked
    mainButton.addEventListener("click", (ev) => {
        let target = ev.target;

        // toggle the show class on global-nav
        document.querySelector(".global-nav").classList.toggle("show");

        // check to see if target is the button or something inside the button
        if (target.tagName != "BUTTON") {
            target = target.closest("button");
        }

        // check to see if we just opened or closed the menu
        if (document.querySelector(".global-nav").classList.contains("show")) {
            // if we opened it then set the aria-expanded attribute on button to true
            target.setAttribute("aria-expanded", true);
        } else {
            // if we closed the button, set the aria-expanded attribute to false
            target.setAttribute("aria-expanded", false);
        }
        console.log("toggle");
    });
}
toggleMenu();

// // Toggle the visibility of the main menu button
// function toggleMenu() {
//   // element with class .global-nav should start hidden 
//   const nav = document.querySelector(".global-nav");
//   const mainMenuButton = document.querySelector("#global-nav-toggle");
//   const openMenu = document.querySelector(".global-nav__toggle-menu-open");
//   const closeMenu = document.querySelector(".global-nav__toggle-menu-close");

//   // add event listener to the button. then run a function that does the toggling
//   mainMenuButton.addEventListener("click", () => {
//     const menuIsOpen = mainMenuButton.getAttribute("aria-expanded") === "true";

//     if (menuIsOpen) {
//       // menu is open, so to close it...
//       nav.classList.remove("global-nav-open");
//       mainMenuButton.setAttribute("aria-expanded", "false");
//       openMenu.classList.remove("hidden");
//       closeMenu.classList.add("hidden");
//     } else {
//       // menu is closed, so to open it...
//       nav.classList.add("global-nav-open");
//       mainMenuButton.setAttribute("aria-expanded", "true");
//       openMenu.classList.add("hidden");
//       closeMenu.classList.remove("hidden");
//     }
//   });
// }// toggle menu to kick it off
// toggleMenu();

async function init() {
    try {
        const parkData = await getParkData();
        const infoLinks = getInfoLinks(parkData.images); // this will build the card
    
        setParkInfo(infoLinks); // this will output the media cards
        setParkIntro(parkData);
        setHeaderFooter(parkData); // this will set the header and footer
    } catch (error) {
        console.error("Error loading park data:", error);
        document.querySelector("main").innerHTML = "<p class='error'> Failed to load park information. Please try again later.</p>";
    }
}   
init();