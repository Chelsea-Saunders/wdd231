import { getParkData } from "./parkService.mjs";

// get the data
const parkData = getParkData();

//select the elements
const disclaimer = document.querySelector(".disclaimer");
const disclaimerLink = document.querySelector("a"); // select the a inside the disclaimer!!
const imageBanner = document.querySelector(".image-banner img");
const imageBannerContent = document.querySelector(".image-banner_content")

// update disclaimer
disclaimer.href = parkData.url; // update the href to the park's URL
disclaimerLink.textContent = parkData.fullName; // update the text to the park's name

// update page title
document.title = parkData.fullName; 

// update hero image
imageBanner.src = parkData.images[0].url; // this will update where the image comes from
imageBanner.alt = parkData.images[0].altText || parkData.fullName; // this will update the alt text or give the park's name 

// update the name, designation and states of park
imageBannerContent.innerHTML = parkInfoTemplate(parkData);

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