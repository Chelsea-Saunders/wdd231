const baseUrl = "https://developer.nps.gov/api/v1/";
// each request will have a baseUrl + resourcePath + parameters
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
      method: "GET", 
      headers: {
          "X-Api-Key": apiKey
      }
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
      data = await response.json();
  } else throw new Error("response not ok");
  return data;
}
export async function getParkData(parkCode = "yell") {
  const data = await getJson(`parks?parkCode=${parkCode}`);
  return data.data[0];
}
export async function getVisitorCenterData(parkCode = "yell") {
  const data = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return data.data;
}


// export async function getParkData() {

//   const options = {
//     method: "GET",
//     headers: {
//       "X-Api-Key": apiKey
//     }
//   };

//   let data = {};

//   const response = await fetch (baseUrl + "parks" + "?parkCode=yell", options);

//   // make sure response is ok
//   if (response.ok) {
//     // conver to json
//     data = await response.json();
//   } else throw new Error("response not ok");
//   return data.data[0];
// }
// // function for visitors center
// export async function getVisitorCenterData() {
//   const options = {
//     method: "GET", 
//     headers: {
//       "X-Api-Key": apiKey
//     }
//   };
//   let data = {};
//   const response = await fetch(baseUrl + "visitorcenters" + "?parkCode=yell", options);
//   // response ok?
//   if (response.ok) {
//     //convert to json
//     data = await response.json();
//   } else throw new Error("response not ok");
//   return data.data[0];
// }