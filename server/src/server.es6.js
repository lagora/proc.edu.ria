import generator from './generator.es6.js'
var ws = require('websocket.io')
  , server = ws.listen(8081)
import ProceduriaBuilder from './ProceduriaBuilder.es6.js'

server.on('upgrade', function (req, socket, head) {
  server.handleUpgrade(req, socket, head);
});

server.on('connection', function (client) {
  client.on('ready', function () {
    console.log('client is ready')
    var builder = new ProceduriaBuilder();
    builder.make();
  });
  client.on('message', function () { });
  client.on('close', function () { });
});
