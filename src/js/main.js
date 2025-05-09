import { getParkData, getVisitorCenterData } from "./parkService.mjs";

//function for the name designation and states of the park
function parkInfoTemplate(info) {
    const parkNameParts = info.name.split(" National Park");
    const parkMainName = parkNameParts[0];

    return `<a href="/" class="park-description_name">${parkMainName}</a>
    <p class="park-description-p">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}
// create setHeaderInfo function
function setHeaderInfo(data) {
    const disclaimerLink = document.querySelector(".disclaimer > a"); // select the a inside the disclaimer!!
    // update disclaimer
    disclaimerLink.href = data.url; // update the href to the park's URL
    disclaimerLink.textContent = data.fullName; // update the text to the park's name
    // update title for the site. Notice that we can select things in the head just like in the body with a querySelector
    document.querySelector("head > title").textContent = `${data.fullName} | Yellowstone National Park`;
    // set banner image
    const bannerImg = document.querySelector(".image-banner > img");
    if (data.images && data.images.length > 0) {
        bannerImg.src = data.images[0].url;
    } else {
        bannerImg.alt = "No image available";
    }
    
    // set the banner image
    // document.querySelector(".image-banner > img").src = data.images[0].url;
    // user the template function above to set the rest of the specific info in the header
    document.querySelector(".image-banner_content").innerHTML = parkInfoTemplate(data);
}

// function for mailing address
function getMailingAddress(addresses) {
    if (!Array.isArray(addresses)) return null; 
    return addresses.find((address) => address.type === "Mailing") || null;
}
// function for phone number
function getPhoneNumber(numbers) {
    if (!Array.isArray(numbers)) return "unavailable"; 
    const voice = numbers.find((number) => number.type === "Voice");
    return voice?.phoneNumber || "unavailable";
}

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

// function to create contact info in footer
function contactFooter(info) {
    const mail = getMailingAddress(info.addresses);
    const voice = getPhoneNumber(info.contacts?.phoneNumbers);

    return `
        <section class="park-footer">
            <h3>Contact Info</h3>
            <p><strong>Mailing Address:</strong><br>
            ${mail?.line1 || "No address available"}<br>
            ${mail?.city ||""}, ${mail.stateCode ||""} ${mail.postalCode ||""}
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
function setParkImages(images) {
    const container = document.querySelector(".media-cards");
    container.innerHTML = images 
        .slice(0, 3)
        .map(img => `<img src="${img.url}" alt="${img.altText}" />`)
        .join("");
}
// create a function for footer
function setParkFooter(data) {
    const footer = document.querySelector("#park-footer");
    if (!footer) return; // check if footer element exists
    const contactHTML = contactFooter(data);
    footer.innerHTML = contactHTML; // replaces instead of appending
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
            image: images[9]?.url || "",
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
        setHeaderInfo(parkData);
        setParkFooter(parkData);
        // setParkImages(parkData.images);
        // setParkInfo(parkData);
    } catch (error) {
        console.error("Error loading park data:", error);
        const main = document.querySelector("main");
        main.innerHTML = "<p class='error'>Failed to load park information. Please try again later.</p>";
    }
}   
init();