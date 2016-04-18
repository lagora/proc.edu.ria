import waterfall from 'async-waterfall';
import fs from 'fs-extra'
import connect from 'connect';
import serveStatic from 'serve-static';
import http from 'http';

import generator from './generator.es6.js';
import Datastore from 'nedb';
import WebSocketServer from 'websocketserver';
import glob from 'glob';

waterfall([
  (next) => {
    let version = '0.0';
    let cfg = {
      version: version,
      path: "rules",
      files: glob.sync(`./rules/${version}/*.json`)
    };
    next(null, cfg);
  },
  (cfg, next) => {
    let oneRuleFileNotFound = cfg.files.some((filename) => !fs.existsSync(`${filename}`));
    let err = oneRuleFileNotFound ? new Error(`one rule file is missing in ${cfg.path}`):null
    next(err, cfg);
  },
  (cfg, next) => {
    cfg.rules = cfg.files.map((filename) => JSON.parse(fs.readFileSync(`${filename}`).toString()));
    next(null, cfg);
  },
  (cfg, next) => {
    cfg.db = new Datastore({filename: './data/proc.edu.ria.json', autoload: true});
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
