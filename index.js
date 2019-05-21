const http = require("http");
const fs = require("fs");
const Path = require("path");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Requesting for " + req.url + " by method " + req.method)
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
                fs.createReadStream(filePath).pipe(res);

            }
        })

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><body><h1>Error: 404<br>" + fileUrl + " Extension Error</h1></body></html>");

    }

})

server.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})