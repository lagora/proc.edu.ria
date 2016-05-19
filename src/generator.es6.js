import scan from "./scan.es6.js";
import getHexFromHash from "./getHexFromHash.es6.js";
import * as rules from "./rules.es6.js";

export default function generator (cfg, callback) {
  let data = [];// window.localStorage.getItem(cacheName);
  let size = cfg.size;
  let cubicSize = cfg.cubicSize;
  let hash = cfg.hash;
  let scanData = scan(cfg.size, cfg.unit);
  scanData.forEach((block) => {
    let index = block.i;
    let hex = getHexFromHash({ hash, index });
    let ruleArgs = { hex, index, hash, block, size, cubicSize };
    data.push(rules.rule0(ruleArgs));
    data.push(rules.rule1(ruleArgs));
  });

  data = data.filter(item => false !== item);
  let finalData = [];
   data.forEach((item) => {
    if (!Array.isArray(item)) {
      finalData.push(item);
    } else {
      item.forEach((subItem) => {
        finalData.push(subItem);
      });
    }
  });

  console.log("finalData", finalData);

  callback(null, finalData);
}
