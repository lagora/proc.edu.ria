// import getCacheName from "./getCacheName.es6.js";
// WIP: not yet usable
var cache = {
  get: () => {
    console.trace("arguments", arguments);
    // window.localStorage.getItem(key);
  },
  set: (value) => {
    let name = "temp-name";
    window.localStorage.setItem(name, value);
  }
};

export default cache;
