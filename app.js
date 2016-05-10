'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('./dist/'));
app.get('/', function(req, res) {
    res.sendfile('./index.html');
});

app.listen(1337);
