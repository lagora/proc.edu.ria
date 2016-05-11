import getCacheName from "./getCacheName.es6.js";
import * as r from "./rules.es6.js"

function generator (cfg, callback) {
  let cacheName = getCacheName("generator", cfg);
  let data = window.localStorage.getItem(cacheName);
  if (!data) {
    data = Object.values(r).map((rule) => {
      return rule(cfg);
    });
    window.localStorage.setItem(cacheName, JSON.stringify(data));
  } else {
    try {
      data = JSON.parse(data);
    } catch(e) {
      window.localStorage.removeItem(cacheName);
    }
  }
  callback(null, data);
}

export default generator;
