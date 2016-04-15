import sha512 from 'sha512'

var raw = window.location.search;
console.log('raw', raw);
if (!raw) {
  window.location = '/?w=180&h=90&debug=true&size=8';
}
var refined = raw.length ? raw.replace('?',''):false,
splitted = refined.split('&').map((opts) => opts.split('=')),
[...rawQueryData] = refined ? refined.split('&').map((chunk) => chunk.split('=')):false,
queryParams = false;

var opts = {};
splitted.forEach((opt) => {
  opts[opt[0]] = opt[1]
})

const config = {
  dev: opts.dev || true,
  debug: opts.debug || true,
  wireframe: opts.wireframe || false,
  autoRotate: opts.autoRotate || true,
  w: parseInt(opts.w) || 320,
  h: parseInt(opts.h) || 240,
  fov: parseInt(opts.fov) || 75,
  near: parseFloat(opts.near) || 0.1,
  far: parseInt(opts.far) || 1000,
  zoom: parseInt(opts.zoom) || 2,
  levelMax: parseInt(opts.levelMax) || 0,
  size: parseInt(opts.size) || 4,
  originalSeed: opts.seed || opts.dev ? Math.random().toString():'proc.edu.ria'
}

// let maxSeedLength = 512/4
// let maxSize = 32
// config.size = maxSize < config.size ? maxSize:config.size
// config.cubicSize = Math.pow(config.size, 3)
// var mkSha = (string) => sha512(string).toString('hex')
// config.rawSeed = mkSha(config.originalSeed)
// while (config.rawSeed.length < config.cubicSize) {
//   let rest = config.cubicSize - config.rawSeed.length
//   if (config.debug) console.info(`filling up to ${rest} hex chars with seed generated from rawSeed`)
//   config.rawSeed += mkSha(config.rawSeed).substr(0, rest)
// }

// let sizeToUse = 'cubicSize'
// config.seed = config.rawSeed.substr(0, config.cubicSize).substr(0, config[sizeToUse])
config.ws = new WebSocket('ws://localhost:8015')

config.ws.onopen = event => {
  console.log('websocket connected')
  config.ws.send(JSON.stringify({event:"cfg", cfg:config}))
}

if (config.debug) {
  console.info('config:', config)
  console.info('size', config.size)
  // console.info('cubicSize', config.cubicSize)
  // console.info('rawSeed', config.rawSeed.length, config.rawSeed)
  // console.info('seed', config.seed.length, config.seed)
}

export default config
