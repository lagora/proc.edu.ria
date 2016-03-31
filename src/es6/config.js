var raw = window.location.search,
refined = raw.length ? raw.replace('?',''):false,
[...rawQueryData] = refined ? refined.split('&').map((chunk) => chunk.split('=')):false,
queryParams = false;

if (rawQueryData.length) {
  queryParams = {};
  rawQueryData.map((chunk) => queryParams[chunk[0]] = chunk[1]);
}

var config = queryParams || {
  w: 720,
  h: 480,
  near: 0.1,
  far: 1000,
  zoom: 1
};

export default config
