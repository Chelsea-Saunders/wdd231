import { 
    getParkData, 
    setHeaderFooter, 
    retrieveAlerts, 
    getVisitorCenterData, 
    visitorCenterTemplate, 
    getAllActivities, 
    allActivitiesTemplate 
} from "./parkService.mjs";
import spritePath from '../images/sprite.symbol.svg';
import "../css/style.css";
import "../css/partials/conditions.css";

// making "yell" the global parkCode...can be changed from here only then in each code...
const urlParameters = new URLSearchParams(window.location.search);
const parkCode = urlParameters.get("parkCode") || "yell"; // default to yellowstone 

function alertTemplate(conditionAlerts) {
    let alertType = "";
    // console.log(`TITLE: "${conditionAlerts.title}"`);
    // console.log(`CATEGORY: "${conditionAlerts.category}"`);


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
        alertType = alert.category.toLowerCase();

        // console.log(`ALERT TYPE: "${alertType}"`);
        // console.log(`Alert: "${conditionAlerts.title}", category: "${conditionAlerts.category}", type: "${alertType}"`);

    }
    return `
        <li class="conditionAlert">
            <svg class="conditionAlert-icon" focusable="false" aria-hidden="true">
                <use xlink:href="${spritePath}#alert-${alertType}"></use>
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

    // set the activities
    const activities = await getAllActivities(parkCode);
    const activityContainer = document.querySelector(".activities details ul");
    const activitiesHTML = activities.map(allActivitiesTemplate).join("");
    activityContainer.innerHTML = activitiesHTML;

    // visitor center data
    const visitorCenters = await getVisitorCenterData(parkCode);
    const container = document.querySelector(".visitor ul");
    const centerHTML = visitorCenters.map(visitorCenterTemplate).join("");
    container.innerHTML = centerHTML;

    setAlerts(alerts); // this will set the alerts
    setHeaderFooter(parkData);
}   

init();