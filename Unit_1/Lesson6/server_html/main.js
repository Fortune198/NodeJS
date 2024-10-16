
const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

http
    .createServer((req, res) => {
        let url = req.url;//store the req url in a var url
        if (url.indexOf(".html") !== -1) {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });//if file is in the html file 
            customReadFile(`./views${url}`, res);//respond with index html
        } else if (url.indexOf(".js") !== -1) {//js file
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/javascript"
            });
            customReadFile(`./public/js${url}`, res);//test.js
        } else if (url.indexOf(".css") !== -1) {//css file
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/css"
            });
            customReadFile(`./public/css${url}`, res);//test.css
        } else if (url.indexOf(".png") !== -1) {//png file
            res.writeHead(httpStatus.OK, {
                "Content-Type": "image/png"
            });
            customReadFile(`./public/images${url}`, res);//test.png
        } else {
            sendErrorResponse(res);//error message
        }
    })
    .listen(3000);
console.log(`The server is listening on port number: ${port}`);

const customReadFile = (file_path, res) => {//look for file by name requested
    if (fs.existsSync(file_path)) {//check whether file exists
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);//if file doesn't exist
    }
};



// const port = 3000;
// const http = require("http");
// const httpStatus = require("http-status-codes");
// //const router = require("./router");
// const fs = require("fs");
// const plainTextContentType = {
//     "Content-Type": "text/plain"
// },
//     htmlContentType = {
//         "Content-Type": "text/html"
//     },
//     customReadFile = (file, res) => {
//         fs.readFile(`./${file}`, (errors, data) => {
//             if (errors) {
//                 console.log("Error reading the file...");
//             }
//             res.end(data);
//         });
//     };
// router.get("/", (req, res) => {
//     res.writeHead(httpStatusCodes.OK, plainTextContentType);
//     res.end("INDEX");
// });
// router.get("/index.html", (req, res) => {
//     res.writeHead(httpStatusCodes.OK, htmlContentType);
//     customReadFile("views/index.html", res);
// });
// router.post("/", (req, res) => {
//     res.writeHead(httpStatusCodes.OK, plainTextContentType);
//     res.end("POSTED");
// });
// http.createServer(router.handle)
//     .listen(3000);
// console.log(`The server is listening on port number: ${port}`);