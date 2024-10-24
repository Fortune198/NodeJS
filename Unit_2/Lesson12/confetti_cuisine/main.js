"use strict";

const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

//requires ejs express layout module
//sets application to use ejs
app.set("view engine", "ejs");

//parses route into JSON object
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
//shows which folder the files that'll be rendered is contained in
//enables static files
app.use(express.static("public"));

//displays home page
app.get("/", (req, res) => {
  res.render("index");
});

//what should display depending on what is in the browers url
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

//error hadler middleware
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//print where website is running on in console (port 3000)
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
