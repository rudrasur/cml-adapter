const express = require("express");
const bodyParser = require("body-parser");

const { parseHtml } = require("./services/html-parser");
const { parseQml } = require("./services/qml-parser");

const app = express();
app.use((req, resp, next) => {
    req.setEncoding('utf8');
    req.body = '';
    req.on('data', function(chunk) {
        req.body += chunk;
    });
    req.on('end', function(){
        next();
    });
})

app.post("/parse-data", (req, resp) => {
    if (req.headers['content-type'] === "text/html") {
        const [statusCode, responseData] = parseHtml(req.body);
        resp.send(statusCode, responseData);
    } else if (req.headers['content-type'] === "text/qml") {
        const [statusCode, responseData] = parseQml(req.body);
        resp.send(statusCode, responseData);
    } else {
        responseData = `Content type ${req.headers['content-type']} is not supported! supported content types are 'text/html' and 'text/qml'.`;
        resp.send(400, responseData);
    }
});

app.listen(4000, () => {
    console.log('App is listening on 4000!!!!!');
})