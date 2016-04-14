import connect from 'connect'
var app = connect();
import serveStatic from 'serve-static'
import http from 'http'
// var server = http.Server(app);

import bodyParser from 'connect-hopeful-body-parser'
import resetDb from '../../src/reset.db.es6.js'
import generator from '../../src/generator.es6.js'

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
  var server = new WebSocketServer("all", 8015);

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
      console.log('cfg', data);
      data.ws = server;
      data.wsId = id;
      generator(data);
    break;
  }
})
