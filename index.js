const http = require("http");
const Path = require("path");

const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const express = require('express');
const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var fileUrl;
    if (req.url == '/')
        fileUrl = '/index.html';
    else
        fileUrl = req.url;

    var filePath = Path.resolve('./public' + fileUrl);
    var fileExt = Path.extname(filePath);
    if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end("<html><body><h1>Error: 404<br>" + filePath + " Does not Exist</h1></body></html>");
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

            }
        })

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><body><h1>Error: 404<br>" + fileUrl + " Extension Error</h1></body></html>");

    }


});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})