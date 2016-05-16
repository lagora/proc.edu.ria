import scan from "./scan.es6.js";
import getHexFromHash from "./getHexFromHash.es6.js";
import * as r from "./rules.es6.js";
// import getCacheName from "./getCacheName.es6.js";

function generator (cfg, callback) {
  // let cacheName = getCacheName("generator", cfg);
  let data = [];// window.localStorage.getItem(cacheName);
  // if (!data) {
    let scanData = scan(cfg.size, cfg.unit);
    scanData.forEach((block) => {
      Object.values(r).forEach((rule) => {
        let hex = getHexFromHash({ hash: cfg.hash, index: block.i });
        let item = rule({ hex, block });
        if (item) {
          data.push(item);
        }
      });
    });
    // data = Object.values(r).map((rule) => {
    //   return rule(cfg);
    // });
  //   if (cfg.size <= 16) {
  //     window.localStorage.setItem(cacheName, JSON.stringify(data));
  //   }
  // } else {
  //   try {
  //     data = JSON.parse(data);
  //   } catch(e) {
  //     window.localStorage.removeItem(cacheName);
  //   }
  // }
  callback(null, data);
}

export default generator;
