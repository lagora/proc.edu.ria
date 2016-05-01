// var restify = require('restify');
// var fs = require('fs-extra');
// var config = new require('./configurator.js');
// var generator = require('./generator.js');

import restify from '../node_modules/restify-es6/bootstrap.js';
import fs from 'fs-extra';
import config from './configurator.es6.js';
import generator from './generator.es6.js';

console.log(config);

var server = restify.createServer({});
server.use(restify.queryParser());
server.use(restify.bodyParser());

function send(req, res, next) {
  res.send('hello ' + req.params.name);
  return next();
}

server.get('/node_modules/three/three.js', restify.serveStatic({directory: './node_modules/three', file: 'three.js'}));
server.get('/dist/client.js', restify.serveStatic({directory: './dist', file: 'client.js'}));
server.get('/type/:type', function (req, res, next) {
  console.log('req.query', req.query);
  next();
});
server.get('/', restify.serveStatic({directory: './', default: 'index.html'}));
server.listen(1337);

// generator(config, function (err, data) {
//   console.log('err', err, 'data', data);
// })
