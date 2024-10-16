"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

//connecting to database
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");

});

//CREATING DOCUMENTS TO SAVE TO DB
//promises
Subscriber.create({
  name: "Fortune Matshika",
  email: "matshikafortune@gmail.com"
})
  .then((savedDoc) => {
    console.log(savedDoc);
  })
  .catch((err) => {
    console.log(err);
  });

const query = Subscriber.find({ name: "Fortune Matshika" }).exec();
query
  .then(docs => {
    console.log(docs); // Handle the results
  })
  .catch(err => {
    console.error(err); // Handle errors
  });

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

//1-step(do both using create method)
//callback functions
// Subscriber.create(
//   {
//     name: "Jada Mathele",
//     email: "jada@mathele.com"
//   },
//   function (err, savedDoc) {
//     if (err) console.log(err);
//     console.log(savedDoc);
//   }
// );

//query
//finding a document according to a match in the email field
// let myQuery = Subscriber.find({
//   name: "Jada Mathele"
// })
//   .where("email", /mathele/);
// myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
// });

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});