import getCacheName from "./getCacheName.es6.js";

var cache = {
  get: () => {
    console.trace("arguments", arguments);
    // window.localStorage.getItem(key);
  },
  set: (value) => {

  }
}

export default cache;
