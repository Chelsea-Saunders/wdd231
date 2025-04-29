// Step 1: Import
import { getParkData } from "./parkService.mjs";

const parkInfoLinks = [
    {
        name: "Current Conditions #$*#$",
        link: "conditions.html",
        image: parkData.images[2].url,
        description: "See what conditions to expect in the park before leaving on your trip."
    },
    {
        
    }
]

//function for the name designation and states of the park
function parkInfoTemplate(info) {
    const parkNameParts = info.name.split(" National Park");
    const parkMainName = parkNameParts[0];

    return `<a href="/" class="image-banner_name">${parkMainName}</a>
    <p class="image-banner_spans">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}

// Step 2: Define functions (all of them, remember they're read in order of decending page)

// create setHeaderInfo function
function setHeaderInfo(data) {
    const disclaimer = document.querySelector(".disclaimer");
    const disclaimerLink = document.querySelector(".disclaimer a"); // select the a inside the disclaimer!!
    // update disclaimer
    disclaimerLink.href = data.url; // update the href to the park's URL
    disclaimerLink.textContent = data.fullName; // update the text to the park's name
    // update title for the site. Notice that we can select things in the head just like in the body with a querySelector
    document.querySelector("head > title").textContent = `${data.fullName} | Yellowstone National Park`;
    // set the banner image
    document.querySelector(".image-banner > img").src = data.images[0].url;
    // user the template function above to set the rest of the specific info in the header
    document.querySelector(".image-banner_content").innerHTML = parkInfoTemplate(data);
}

// function to fill main content for html
function fillMainContent(parkData) {
    const mainIntro = document.querySelector(".intro");
    const mainInfo = document.querySelector(".info");

    // update the intro
    mainIntro.innerHTML = `<h2>${parkData.fullName}</h2><p>${parkData.description}</p>`;
    // update the info
    mainInfo.innerHTML = `<h2>${parkData.name}</h2><p>${parkData.weatherInfo}</p>`;
}

// function that will create a component consisting of an image, headline and paragraph
function mediaCardTemplate(info) {
    return`
       <a href="${info.url}" class="media-card">
        <img src="${info.imgUrl}" alt="${info.info.altText}">
        <h3>${info.title}</h3>
        <p>${info.description}</p>
        </a>`;
}

// Step 3: DOMContentLoaded runs AFTER everything else is ready or...ERROR

document.addEventListener("DOMContentLoaded", function() {

    // Step 3.1: Declare youre DOM elements (querySelector) INSIDE the DOMContentLoaded()

    const parkData = getParkData(); 

    // Step 3.2: Call functions INSIDE the DOMContentLoaded()
    
    // get the data
    setHeaderInfo(parkData); // call the function to set the header info
    fillMainContent(parkData); // call the function to fill the main content
});