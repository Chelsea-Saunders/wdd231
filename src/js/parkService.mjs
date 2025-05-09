const baseUrl = "https://developer.nps.gov/api/v1/";
// API key
const apiKey = "JSeukSZlUUihck5uk4KPPYDrrzvSulFtWUOPDsn7";
// const apiKey = import.meta.env.VITE_NPS_API_KEY;
console.log("loaded api key:", apiKey);

export async function getParkData() {
  let data ={};
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  const response = await fetch(baseUrl + "parks" + "?parkCode=yell", options);
  // check to make sure the response was ok
  if (response.ok) {
    // convert to json
    data = await response.json();
  } else throw new Error("response not ok");
  return data.data[0];
}