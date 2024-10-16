const port = 3000;
const express = require("express"),//adding express module to app

    app = express();//assign express to app constant 
app.get("/", (req, res) => {//set up GET req for home page
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.send("Hello, Universe!");//respond with this message
});
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});//set up app to listen on port 3000