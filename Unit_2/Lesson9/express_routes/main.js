const port = 3000;
const express = require("express");
const app = express();

// app.post("/contact", (req, res) => {//handle request with this post method
//     res.send("Contact information submitted successfully.");
// });

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use((req, res, next) => {//definining middleware func 
    console.log(`request made to: ${req.url}`);//log to console requested   URL
    next();//call next func
});

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});

app.get("/items/:vegetable", (req, res) => {//adding route to get URL parameters
    let veg = req.params.vegetable;
    res.send(`This page is for ${veg}`);
});//respond with path parameters

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});