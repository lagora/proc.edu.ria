import hashPadding from "./hashPadding.es6.js";

function makeSeedHash (cfg) {
  let cachedName = `makeSeedHash-${cfg.seed}-${cfg.size}`;
  var seedHash = window.localStorage.getItem(cachedName);
  if (!seedHash) {
    seedHash = hashPadding(cfg.seed, cfg.cubicSize);
    window.localStorage.setItem(cachedName, seedHash);
  }
  return seedHash;
}

export default makeSeedHash;
