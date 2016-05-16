import getCacheName from "./getCacheName.es6.js";
import * as r from "./rules.es6.js"

export default function generator (cfg, callback) {
  let cacheName = getCacheName("generator", cfg);
  let data = window.localStorage.getItem(cacheName);
  if (!data) {
    data = Object.values(r).map((rule) => {
      return rule(cfg);
    });
    if (cfg.size <= 16) {
      window.localStorage.setItem(cacheName, JSON.stringify(data));
    }
  } else {
    try {
      data = JSON.parse(data);
    } catch(e) {
      window.localStorage.removeItem(cacheName);
    }
  }
  callback(null, data);
}
