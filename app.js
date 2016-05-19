// simple express server
var express = require("express");
var app = express();

// app.use(express.static("./src/"));
app.get("/", function(req, res) {
    res.sendfile("./index.html");
});
// app.get("/babel-polyfill/browser.js", function(req, res) {
//     res.sendfile("./node_modules/babel-polyfill/browser.js");
// });
app.get("/three.js", function(req, res) {
    res.sendfile("./node_modules/three/three.js");
});
app.get("/proc.edu.ria.es6.js", function(req, res) {
    res.sendfile("./dist/proc.edu.ria.js");
});

app.listen(1337);
