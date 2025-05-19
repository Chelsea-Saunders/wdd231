import { getParkData, setHeaderFooter, retrieveAlerts } from "./parkService.mjs";

// making "yell" the global parkCode...can be changed from here only then in each code...
const urlParameters = new URLSearchParams(window.location.search);
const parkCode = urlParameters.get("parkCode") || "yell"; // default to yellowstone 

function alertTemplate(info) {
    let icon;

    switch (info.category?.toLowerCase()) {
        case "closure":
            icon = "alert-closure";
            break;
        case "danger":
            icon = "alert-danger";
            break;
        case "warning":
            icon = "alert-warning";
            break;
        case "caution":
        case "advisory":
            icon = "alert-caution";
            break;
        default: 
            icon = "alert-info";
    }
    return `
        <div class="alert">
            <svg class="icon" focusable="false" aria-hidden="true">
                <use xlink:href="/images/sprite.symbol.svg#${icon}"></use>
            </svg>
            <h3 class="alert_title">${info.title}</h3>
            <p>${info.description}</p>
        </div>`;
}

function setAlerts(alerts) {
    const alertInfo = document.querySelector(".alerts");
    if (!alerts || alerts.length === 0) {
        alertInfo.innerHTML = "<p>No alerts available</p>";
        return;
    }

    const alertsHTML = alerts.map(alertTemplate).join("");
  
    // wrapping image links in a container
    alertInfo.innerHTML = alertsHTML;
  }

async function init() {
    const parkData = await getParkData(parkCode);
    const alerts = await retrieveAlerts(parkCode);

    setAlerts(alerts); // this will set the alerts
    setHeaderFooter(parkData);
    console.log(alerts);
}   
init();