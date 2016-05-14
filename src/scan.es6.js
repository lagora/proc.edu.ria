<<<<<<< HEAD
function scan(max, step = 1) {
  let i = 0;
  let data = [];
  for (let x = 0; x < max; x += step) {
    for (let y = 0; y < max; y += step) {
      for (let z = 0; z < max; z += step) {
        // yield { i, x, y, z };
        data.push({ i, x, y, z });
        i++;
      }
    }
  }

  return data;
=======
// import getCacheName from "./getCacheName.es6.js";
// import cfg from "./config.es6.js";

function scan(max, step = 1) {
  let cached = [];
  // let cachedName = getCacheName("scan", cfg);
  // var cached = window.localStorage.getItem(cachedName);
  // if (!cached) {
    let i = 0;
    for (let x = 0; x < max; x += step) {
      for (let y = 0; y < max; y += step) {
        for (let z = 0; z < max; z += step) {
          // yield { i, x, y, z };
          cached.push({ i, x, y, z });
          i++;
        }
      }
    }
    // window.localStorage.setItem(cachedName, cached);
  // }

  return cached;
>>>>>>> b4cec013a9cabade53f444424891dab010123043
}

export default scan;
