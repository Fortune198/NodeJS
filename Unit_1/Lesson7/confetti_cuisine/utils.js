
//import modules needed in getFile func
const fs = require("fs");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");

//exporting function to read files and respond
module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
                    contentTypes.html);
                res.end("There was an error serving content!");//response when there is error
            }
            res.end(data);//Respond with requested data
        });
    }
};