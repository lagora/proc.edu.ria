var connect = require('connect');
var app = connect();
var serveStatic = require('serve-static');
var server = require('http').Server(app);

app.use(
    serveStatic("./")
).listen(1337);
