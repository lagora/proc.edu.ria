var raw = window.location.search,
refined = raw.length ? raw.replace('?',''):false,
[...rawQueryData] = refined ? refined.split('&').map((chunk) => chunk.split('=')):false,
queryParams = false;

if (rawQueryData.length) {
  queryParams = {};
  rawQueryData.map((chunk) => queryParams[chunk[0]] = chunk[1]);
}

let dev = !!(queryParams && queryParams.dev) || false;
const config = {
  dev: dev,
  debug: !!(queryParams && queryParams.debug) || false,
  wireframe: !!(queryParams && queryParams.wireframe) || false,
  autoRotate: !!(queryParams && queryParams.autoRotate) || false,
  stepSeed: queryParams && queryParams.stepSeed || 150,
  w: queryParams && queryParams.w || 720,
  h: queryParams && queryParams.h || 480,
  fov: queryParams && queryParams.fov || 75,
  near: queryParams && queryParams.near || 0.1,
  far: queryParams && queryParams.far || 1000,
  zoom: queryParams && queryParams.zoom || 2,
  levelMax: queryParams && queryParams.levelMax || 0,
  size: parseInt(queryParams && queryParams.size || 4),
}

if (config.debug) {
  console.info('config:', config)
  console.info('size', config.size)
}

export default config
