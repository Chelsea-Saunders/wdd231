// Step 1: Import
import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: parkData.images[2].url,
        altText: "Visitors walking down a bordwalk trail with steam rising from the hotsprings.",
        description: "See what conditions to expect in the park before leaving on your trip."
    },
    {
        name: "Fees and Passes &#x203A;", 
        link: "fees.html", 
        image: parkData.images[3].url,
        altText: "Visitors on a boardwalk with geyser erupting in front of them.",
        description: "Learning about the fees and passes that are avaliable."
    },
    {
        name: "Visitor Centers &#x203A",
        link: "visitor_center.html",
        image: parkData.images[9].url,
        altText: "Wild sheep resting on a hill near a visitors center.",
        description: "Learn about the visitor centers in the park."
    }
]; 

//function for the name designation and states of the park
function parkInfoTemplate(info) {
    const parkNameParts = info.name.split(" National Park");
    const parkMainName = parkNameParts[0];

    return `<a href="/" class="park-decription_name">${parkMainName}</a>
    <p class="park-description-p">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}

// Step 2: Define functions (all of them, remember they're read in order of decending page)

// create setHeaderInfo function
function setHeaderInfo(data) {
    const disclaimerLink = document.querySelector(".disclaimer > a"); // select the a inside the disclaimer!!
    // update disclaimer
    disclaimerLink.href = data.url; // update the href to the park's URL
    disclaimerLink.innerHTML = data.fullName; // update the text to the park's name
    // update title for the site. Notice that we can select things in the head just like in the body with a querySelector
    document.querySelector("head > title").textContent = `${data.fullName} | Yellowstone National Park`;
    // set the banner image
    document.querySelector(".image-banner > img").src = data.images[0].url;
    // user the template function above to set the rest of the specific info in the header
    document.querySelector(".image-banner_content").innerHTML = parkInfoTemplate(data);
}

// function for mailing address
function getMailingAddress(addresses) {
    const mail = addresses.find((address) => address.type === "Mailing");
    return mail
}
// function for phone number
function getPhoneNumber(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice.phoneNumber;
}

// function that will create a component consisting of an image, headline and paragraph
function mediaCardTemplate(info) {
    return`
        <div class="media-card">
            <a href="${info.link}">
                <img src="${info.image}" alt="${info.altText}" class="media-card_img">
                <h3 class="media-card_title">${info.name}</h3>
                <p>${info.description}</p>
            </a>
        </div>`;
}

// function to create contact info in footer
function contactFooter(info) {
    const mail = getMailingAddress(info.addresses);
    const voice = getPhoneNumber(info.contacts.phoneNumbers);

    return `
        <section class="park-footer">
            <h3>Contact Info</h3>
            <p><strong>Mailing Address:</strong><br>
            ${mail.line1}<br>
            ${mail.city}, ${mail.stateCode} ${mail.postalCode}
            </p>
            <p><strong>Phone:</strong><br>
            ${voice}</p>
        </section>
        `;
}

// functions for functions
function setParkIntro(data) {
    const mainIntro = document.querySelector(".intro");
    mainIntro.innerHTML = `<h2>${data.fullName}</h2><p>${data.description}</p>`;
}
function setParkInfo() {
    const mainInfo = document.querySelector(".info");
    // const cards = data.map(mediaCardTemplate);
    mainInfo.innerHTML = parkInfoLinks.map(mediaCardTemplate).join("");
}
// create a function for footer
function setParkFooter(data) {
    document.querySelector("#park-footer").innerHTML += contactFooter(data);
}

// Step 3: DOMContentLoaded runs AFTER everything else is ready or...ERROR

document.addEventListener("DOMContentLoaded", function() {
    // Call functions INSIDE the DOMContentLoaded()
    setParkInfo(parkData); // call the function to set the park info
    setParkIntro(parkData); // call the function to set the park intro
    
    // get the data
    setHeaderInfo(parkData); // call the function to set the header info
    
     // add the contact info to the footer
    setParkFooter(parkData);
});