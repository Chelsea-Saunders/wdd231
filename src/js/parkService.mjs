const baseUrl = "https://developer.nps.gov/api/v1/";
// each request will have a baseUrl + resourcePath + parameters
const apiKey = import.meta.env.VITE_NPS_API_KEY;

export async function getParkData() {

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  let data = {};

  const response = await fetch (baseUrl + "parks" + "?parkCode=yell", options);

  // make sure response is ok
  if (response.ok) {
    // conver to json
    data = await response.json();
  } else throw new Error("response not ok");
  return data.data[0];
}