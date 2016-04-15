import waterfall from 'async-waterfall'
import fs  from 'fs-extra'
import connect from 'connect'
import serveStatic from 'serve-static'
import http from 'http'

import bodyParser from 'connect-hopeful-body-parser'
import generator from '../../src/generator.es6.js'
var Datastore = require('nedb');
var WebSocketServer = require("websocketserver");

waterfall([
  (next) => {
    let rulesIndexFilename = './rules.json';
    let rulesIndexFound = fs.existsSync(rulesIndexFilename);
    let err = rulesIndexFound ? null:new Error('rules index not found');
    let rulesIndex = rulesIndexFound ? fs.readJsonSync(rulesIndexFilename):null;
    next(err, rulesIndex);
  },
  (rulesIndex, next) => {
    let cfg = rulesIndex;
    next(null, cfg);
  },
  (cfg, next) => {
    let oneRuleFileNotFound = cfg.files.some((fileData) => !fs.existsSync(`./${cfg.path}/${fileData.filename}`));
    let err = oneRuleFileNotFound ? new Error(`one rule file is missing in ${cfg.path}`):null
    next(err, cfg);
  },
  (cfg, next) => {
    cfg.rules = cfg.files.map((fileData) => fs.readJsonSync(`./${cfg.path}/${fileData.filename}`));
    next(null, cfg);
  },
  (cfg, next) => {
    cfg.db = new Datastore();
    next(null, cfg);
  }
], (err, cfg) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let serverPort = 1337;
  let websocketPort = 8015;
  var app = connect();
  var server = new WebSocketServer("one", websocketPort);

  app
  // .use(bodyParser())
  .use(
    serveStatic("./")
  ).listen(serverPort, () => {
    console.info(`Proc.Edu.Ria server listening on port ${serverPort}`)
  });
  server.webSocketOut = (objectData, id) => {
    server.sendMessage('one', JSON.stringify(objectData), id);
  }
  server.on("connection", (id) => {
    console.log('connection', id);
  });

  server.on("message", (rawData, id) => {
    let mesObj = server.unmaskMessage(rawData);
    let unmaskedData = server.convertToString(mesObj.message);
    let jsonMessage = JSON.parse(unmaskedData);
    console.log('message', id, jsonMessage);
    let event = jsonMessage.event;
    let data = jsonMessage[event];
    switch (event) {
      default:
      console.log('unhandled request', rawData);
      break;
      case 'cfg':
        data.ws = server;
        data.wsId = id;
        data.db = cfg.db;
        data.rules = cfg.rules;
        generator(data);
      break;
      case 'raw':
        console.info('looking for previous raw data');
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

});
