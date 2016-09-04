// import getCacheName from "./getCacheName.es6.js";
// WIP: not yet usable
var cache = {
  get: (key = false) => {
    key = key || "temp-name";
    return window.localStorage.getItem(key);
  },
  set: (value) => {
    let name = "temp-name";
    window.localStorage.setItem(name, value);
  }
};

export default cache;
