const homeController = require("./controllers/homeController");
const port = 3000;
const express = require("express");
const app = express();

// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
// });

app.use(//tell express app to parse URL-encoded data
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.post("/", homeController.sendPost);

app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/items/:vegetable", (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This page is for ${veg}`);
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});