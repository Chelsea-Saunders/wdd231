// console.log("visitor-center.js is running");
import {
    getParkVisitorCenterDetails,
    getParkData
} from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
        

function getParam(param) {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get(param);
}

async function init() {
    const parkData = await getParkData("yell");
    setHeaderFooter(parkData);

    const id = getParam("id");
    const center = await getParkVisitorCenterDetails(id);
    console.log(center);

    if (!center) {
        document.querySelector(".visitor-center").innerHTML = "<p>Visitor center not found.</p>";
        return;
    }

    document.querySelector(".center-name").textContent = center.name || "Visitor Center";
    document.querySelector("#center-description").textContent = center.description || "No description available.";
    const descImageContainer = document.querySelector("#description-image-container");

    if (center.images && center.images.length) {
        const firstImg = center.images[0];
        const imgHTML = `
            <figure>
                <img src="${firstImg.url}" alt="${firstImg.altText || 'Visitor center image'}" />
                <figcaption>${firstImg.caption || 'Visitor center image'} <span>${firstImg.credit || ''}</span></figcaption>
                </figure>
            `;
            descImageContainer.innerHTML = imgHTML;
    }

    // insert addresses
    const physicalAddressEl = document.querySelector(".vc-phys-add");
    const mailingAddressEl = document.querySelector(".vc-mail-add");

    const physical = center.addresses?.find(addr => addr.type === "Physical");
    const mailing = center.addresses?.find(addr => addr.type === "Mailing");

    if (physical) {
        physicalAddressEl.innerHTML = `
            ${physical.line1 || ""}<br>
            ${physical.line2 || ""}, ${physical.city || ""} ${physical.stateCode || ""}
            `;
    } else {
        physicalAddressEl.textContent = "No physical address available.";
    }

    if (mailing) {
        mailingAddressEl.innerHTML = `
            ${mailing.line1 || ""}<br>
            ${mailing.line2 || ""}, ${mailing.city || ""} ${mailing.stateCode || ""}
            `;
    } else {
        mailingAddressEl.textContent = "No mailing address available.";
    }
    
    // dynamically insert phone number 
    const phoneSection = document.querySelector("#vc-contact a[href^='tel']");
    const phoneNumbers = center.contacts?.phoneNumbers;

    if (phoneNumbers && phoneNumbers.length) {
        phoneSection.textContent = phoneNumbers[0].phoneNumber;
        phoneSection.href = `tel:${phoneNumbers[0].phoneNumber}`;
    } else {
        phoneSection.textContent = "No phone number available.";
        phoneSection.removeAttribute("href");
    }

    // dynamically insert amenities
    const amenitiesSection = document.querySelector("#amenities-information");

    if (center.amenities && center.amenities.length) {
        amenitiesSection.innerHTML = center.amenities.map(item => `<li>${item}</li>`).join("");
    } else {
        amenitiesSection.textContent = "No amenities information available.";
    }

    document.querySelector("#vc-directions p").textContent = center.directionsInfo || "No directions available.";
    document.querySelector("#vc-contact .vc-email a").href = `mailto:${center.emailAddress || ''}`;
    document.querySelector("#vc-contact .vc-email a").textContent = "Send this visitor center an email";

    const galleryContainer = document.querySelector(".vc-gallery ul");
    if (center.images && center.images.length) {
        const galleryHTML = center.images.map(img => `
            <li>
                <img src="${img.url}" alt="${img.altText || 'Visitor center image'}" />
            </li>
        `).join("");
        galleryContainer.innerHTML = galleryHTML;
    } else {
        galleryContainer.innerHTML = "<li>No images available.</li>";
    }
}
init();

document.querySelectorAll("details").forEach(detail => {
    detail.addEventListener("toggle", () => {
        if (detail.open) {
            document.querySelectorAll("details").forEach(d => {
                if (d !== detail) d.removeAttribute("open");
            });
        }
    });
});
