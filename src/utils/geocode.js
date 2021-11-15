const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3VkaGFuc2h1cmFpOTciLCJhIjoiY2t2bzVxcWZ5MGFzejJva2d0ZTZmMGhueCJ9.ZWh8vrbfpLHoX3-j-sHCLg&limit=1";
  // console.log(geoCodeURL); // Make a practice to validate the URL if it is getting curretly passsed when defining logic
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation Services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the Location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
