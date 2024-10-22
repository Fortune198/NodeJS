const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    //log the error trace stack to the console
    console.error(error.stack);
    //pass error object to ext middleware to the next function for further processing
    next(error);
};

//Respond with 404 status code
//let the user know that the request page wasn’t found in your routes
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;//404 error
    res.status(errorCode);
    res.sendFile(`./public/${ errorCode }.html`, { root: "./" });
};

//respond with a 500 status code
//notifies the user of an internal error that prevented the request from being processed 
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;//handles 500 error
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};