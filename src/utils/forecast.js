const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=521b7ce82e20c98a8872cb4036b8703c&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  // const url = "http://api.weatherstack.com/current?access_key=521b7ce82e20c98a8872cb4036b8703c&query=" + latitude + "," + longitude;
  // console.log(url); // Make a practice to validate the URL if it is getting curretly passsed when defining logic

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Services!", undefined);
    } else if (body.error) {
      callback("Unable to find the Location!", undefined);
    } else {
      callback(
        undefined,
        "Weather here is currently " +
          body.current.weather_descriptions[0] +
          "." +
          "\n" +
          "Temperature right now is " +
          body.current.temperature +
          " degree." +
          "\n" +
          "It feels like " +
          body.current.feelslike +
          " degree out." +
          "\n" +
          "Humidity here is " +
          body.current.humidity +
          "." +
          "\n" +
          "Wind speed is " +
          body.current.wind_speed +
          " m/s."
      );
    }
  });
};

module.exports = forecast;
