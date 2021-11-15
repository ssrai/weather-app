const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=521b7ce82e20c98a8872cb4036b8703c&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  // const url = "http://api.weatherstack.com/current?access_key=521b7ce82e20c98a8872cb4036b8703c&query=" + latitude + "," + longitude;
  // console.log(url);  // Make a practice to validate the URL if it is getting curretly passsed when defining logic

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Services!", undefined);
    } else if (body.error) {
      callback("Unable to find the Location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degree out. It feels like " +
          body.current.feelslike +
          " degrees  out."
      );
    }
  });
};

module.exports = forecast;
