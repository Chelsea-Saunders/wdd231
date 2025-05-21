import { 
    getParkData, 
    setHeaderFooter 
} from "./parkService.mjs";
import "../css/style.css";
import "../css/partials/conditions.css";

// making "yell" the global parkCode...can be changed from here only then in each code...
const urlParameters = new URLSearchParams(window.location.search);
const parkCode = urlParameters.get("parkCode") || "yell"; // default to yellowstone 

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