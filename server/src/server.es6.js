import connect from 'connect'
var app = connect();
import serveStatic from 'serve-static'
import http from 'http'
// var server = http.Server(app);

import bodyParser from 'connect-hopeful-body-parser'
import generator from '../../src/generator.es6.js'

var Datastore = require('nedb');
var db = new Datastore()

app
.use(bodyParser())
// .use('/cfg', (req, res, next) => {
//   generator(req.body, (err, results) => {
//     res.end()
//   })
// })
.use(
  serveStatic("./")
).listen(1337, () => {
  console.info('Proc.Edu.Ria')
});

var WebSocketServer = require("websocketserver");
var server = new WebSocketServer("one", 8015);

server.webSocketOut = (objectData, id) => {
  // let packagedMessage = server.packageMessage(id, JSON.stringify(objectData));
  server.sendMessage('one', JSON.stringify(objectData), id);
}

server.on("connection", (id) => {
  console.log('connection', id);
});


server.on("message", (rawData, id) => {
  let mesObj = server.unmaskMessage(rawData);
  let unmaskedData = server.convertToString(mesObj.message);
  let jsonMessage = JSON.parse(unmaskedData);
  let event = jsonMessage.event;
  let data = jsonMessage[event];
  switch (event) {
    default:
    // let packagedMessage = server.packageMessage(mesObj.opcode, JSON.stringify(item));
    // server.sendMessage('one', packagedMessage);
    break;
    case 'cfg':
      data.ws = server;
      data.wsId = id;
      data.db = db;
      generator(data);
    break;
    case 'raw':
      db.find({type: 'raw'}, (err, items) => {
        console.log('err', err, 'items', items);
        if (err) {
          server.webSocketOut(err, id);
        } else if (!items || 0 === items.length) {
          server.webSocketOut({statusCode: 404, message: "no items"}, id);
        } else {
          server.webSocketOut(items, id);
        }
      })
    break;
  }
})
