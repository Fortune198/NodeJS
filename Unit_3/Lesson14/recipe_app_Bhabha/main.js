"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");

//---------------------------------------------------------------------------------------------
const Subscriber = require("./models/subscriber");


//MONGOOSE CONNECTION
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", ()=> {
  console.log("Successfully connected to MongoDB using Mongoose...")
});


//CREATE & SAVE MODELS IN MAIN.JS
//USING CALLBACK FUNCTIONS
//Option1
// let subscriber1 = new Subscriber({
//   name: "Audrey Ntomboxolo",
//   email: "audreyseptember@gmail.com"
// });

// subscriber1.save((error, savedDocument) => {
//   if (error) console.log(error);
//   console.log(savedDocument);
// });

//Option2
// Subscriber.create({
//   name: "Victor Poto",
//   email: "victorseptember@gmail.com"
// }, (
// function (error, savedDocument) {
//   if (error) console.log(error);
//   console.log(savedDocument);
// })
// );

//RUNNING A QUERY
// let myQuery = Subscriber.findOne({
//   name: "Victor Poto"
//   })
//   .where("email", /september/);
//  myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
//  });

//-------------------------------------------------------------------------------------------
//CREATE & SAVE MODELS IN MAIN.JS
//USING PROMISES
//Option2
Subscriber.create({
  name: "Victor Poto",
  email: "victorseptember@gmail.com"
})
  .then(savedDocument => {
    console.log(savedDocument);
  })
  .catch(error => {
    console.log(error);
  });


//RUNNING A QUERY
const query = Subscriber.find({ name: "Victor Poto" }).exec();
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
