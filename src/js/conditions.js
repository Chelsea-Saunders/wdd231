import { getParkData, setHeaderFooter, retrieveAlerts } from "./parkService.mjs";

// making "yell" the global parkCode...can be changed from here only then in each code...
const urlParameters = new URLSearchParams(window.location.search);
const parkCode = urlParameters.get("parkCode") || "yell"; // default to yellowstone 

const alerts = await retrieveAlerts(parkCode);
console.log(alerts);


function alertTemplate(conditionAlerts) {
    let alertType = "";
    console.log(`TITLE: "${conditionAlerts.title}"`);
    console.log(`CATEGORY: "${conditionAlerts.category}"`);


    switch (conditionAlerts.category?.toLowerCase().trim()) {
        case "park closure":
            alertType = "closure";
            break;
        case "danger":
            alertType = "danger";
            break;
        case "warning":
            alertType = "warning";
            break;
        case "information":
            alertType = "info";
            break;
        case "caution":
        case "advisory":
            alertType = "caution";
            break;
        default: 
        alertType = "info";

        console.log(`ALERT TYPE: "${alertType}"`);
        console.log(`Alert: "${conditionAlerts.title}", category: "${conditionAlerts.category}", type: "${alertType}"`);

    }
    return `
        <li class="conditionAlert">
            <svg class="conditionAlert-icon" focusable="false" aria-hidden="true">
                <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
            </svg>
            <div>
            <h3 class="conditionAlert-title-${alertType}">${conditionAlerts.title}</h3>
            <p>${conditionAlerts.description}</p>
        </div></li>`;
}

function setAlerts(conditionAlerts) {
    const alertContainer = document.querySelector(".conditionAlerts ul");
    if (!conditionAlerts || conditionAlerts.length === 0) {
        alertContainer.innerHTML = "<p>No alerts available</p>";
        return;
    }

    const alertsHTML = conditionAlerts.map(alertTemplate).join("");
  
    // wrapping image links in a container
    alertContainer.innerHTML = alertsHTML;
}

async function init() {
    const parkData = await getParkData(parkCode);
    const alerts = await retrieveAlerts(parkCode);

    setAlerts(alerts); // this will set the alerts
    setHeaderFooter(parkData);
}   

init();