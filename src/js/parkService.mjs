const baseUrl = "https://developer.nps.gov/api/v1/";
// each request will have a baseUrl + resourcePath + parameters
const apiKey = import.meta.env.VITE_NPS_API_KEY;

export async function getJson(url) {
  const options = {
      method: "GET", 
      headers: {
          "X-Api-Key": apiKey
      }
  };
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) throw new Error("response not ok");
  const data = await response.json();
  return data;
}
export async function getAllActivities(parkCode) {
  const data = await getJson(`thingstodo?parkCode=${parkCode}`);
  return data.data;
}
export function allActivitiesTemplate(activities) {
  return `
    <li class="all-activities">
      <p>${activities.title}</p>
      `;
}
export async function getParkData(parkCode = "yell") {
  const data = await getJson(`parks?parkCode=${parkCode}`);
  return data.data[0];
}
export async function getVisitorCenterData(parkCode = "yell") {
  const data = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return data.data;
}
// template function to output each visitro center with name, description adn driectionsInfo for each visitors center
export function visitorCenterTemplate(center) {
  return `
    <li class="visitor-center">
      <h3>${center.name}</h3>
      <p>${center.description}</p>
      <p><strong>Directions:</strong> ${center.directionsInfo || "No directions available"}</p>
    </li>
    `;
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

//function for the name designation and states of the park
export function parkInfoTemplate(info) {
  const parkNameParts = info.name.split(" National Park");
  const parkMainName = parkNameParts[0];

  return `<a href="/" class="park-description_name">${parkMainName}</a>
  <p class="park-description-p">
      <span>${info.designation}</span>
      <span>${info.states}</span>
  </p>`;
}
// create header/footer function
export function setHeaderFooter(data) {
  // --- HEADER ---
  const disclaimerLink = document.querySelector(".disclaimer > a"); // select the a inside the disclaimer!!
  
  // update disclaimer
  disclaimerLink.href = data.url; // update the href to the park's URL
  disclaimerLink.textContent = data.fullName; // update the text to the park's name
  // update title for the site. Notice that we can select things in the head just like in the body with a querySelector
  document.querySelector("head > title").textContent = `${data.fullName} | National Parks`;
  // set banner image
  const bannerImg = document.querySelector(".image-banner > img");
  if (data.images?.length > 0) {
      bannerImg.src = data.images[0].url;
      bannerImg.alt = data.images[0].altText || "Park image";
  } else {
      bannerImg.alt = "No image available";
  }
  document.querySelector(".image-banner_content").innerHTML = parkInfoTemplate(data);

  // --- FOOTER ---
  const mail = getMailingAddress(data.addresses);
  const voice = getPhoneNumber(data.contacts?.phoneNumbers);
  const footer = document.querySelector("#park-footer");
  if (footer) {
    footer.innerHTML = `
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
}

export async function retrieveAlerts (parkCode = "yell") {
  const data = await getJson(`alerts?parkCode=${parkCode}`);
  return data.data;  // return the full array of alerts
}