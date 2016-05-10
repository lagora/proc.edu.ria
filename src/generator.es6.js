import getCacheName from './getCacheName.es6.js';
import * as r from "./rules.es6.js";

function generator (cfg, callback) {
  let cacheName = getCacheName("generator", cfg);
  let data = window.localStorage.getItem(cacheName);
  console.trace(`using cache: ${!!data}`);

  if (!data) {
    data = Object.values(r).map((rule) => {
      return rule(cfg);
    });
    console.trace("setting up cache");
    window.localStorage.setItem(cacheName, JSON.stringify(data));
  } else {
    try {
      data = JSON.parse(data);
    } catch(e) {
      console.info(e);
      window.localStorage.removeItem(cacheName);
    }
  }
  callback(null, data);
}

export default generator;
