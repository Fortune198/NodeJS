exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

// exports.sedPost = (req, res) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.send("POST Successful!");
// };

//Respond with a custom ejs view
exports.respondWithName = (req, res) => {
    res.render("index");
};

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("index", { firstName: paramsName });
};