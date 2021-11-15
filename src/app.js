const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view loc
app.set("views", viewsPath); //Customized hbs views path
app.set("view engine", "hbs"); // By default for hbs views location express looks for
hbs.registerPartials(partialsPath); // To set Partial Paths

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    // File name is passed as first args & dynamic content is passed in the form of object props.
    title: "Weather App",
    name: "SudShot",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "SudShot",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is Web Application Help Page.",
    name: "SudShot",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide us Location Name",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error }); // Return will stop current callback execution if error occured
        }

        //Callback Chaining
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error }); // Return will stop current callback execution if error occured
          }

          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a Search Term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "Weather App",
    name: "SudShot",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "Weather App",
    name: "SudShot",
  });
});

app.listen(3030, () => {
  console.log("Server is up and running on Port 3030.");
});
