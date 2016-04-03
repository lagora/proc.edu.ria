import sha512 from '../../node_modules/sha512/lib/sha512.js'
var raw = window.location.search,
refined = raw.length ? raw.replace('?',''):false,
[...rawQueryData] = refined ? refined.split('&').map((chunk) => chunk.split('=')):false,
queryParams = false;

if (rawQueryData.length) {
  queryParams = {};
  rawQueryData.map((chunk) => queryParams[chunk[0]] = chunk[1]);
}

const config = {
  debug: !!(queryParams && queryParams.debug) || false,
  wireframe: !!(queryParams && queryParams.wireframe) || false,
  autoRotate: !!(queryParams && queryParams.autoRotate) || true,
  w: queryParams && queryParams.w || 720,
  h: queryParams && queryParams.h || 480,
  fov: queryParams && queryParams.fov || 75,
  near: queryParams && queryParams.near || 0.1,
  far: queryParams && queryParams.far || 1000,
  zoom: queryParams && queryParams.zoom || 1,
  levelMax: queryParams && queryParams.levelMax || 0,
  size: parseInt(queryParams && queryParams.size || 4),
}
let maxSeedLength = 512/4
let maxSize = 32
config.size = maxSize < config.size ? maxSize:config.size
config.cubicSize = Math.pow(config.size, 3)
var mkSha = (string) => sha512(string || Math.random().toString()).toString('hex')
config.rawSeed = mkSha()
while (config.rawSeed.length < config.cubicSize) {
  let rest = config.cubicSize - config.rawSeed.length
  if (config.debug) console.info(`filling up to ${rest} hex chars with seed generated from rawSeed`)
  config.rawSeed += mkSha(config.rawSeed).substr(0, rest)
}

let sizeToUse = 'cubicSize'
config.seed = config.rawSeed.substr(0, config.cubicSize).substr(0, config[sizeToUse])
if (config.debug) console.info('config:', config)
console.info('size', config.size)
console.info('cubicSize', config.cubicSize)
console.info('rawSeed', config.rawSeed.length, config.rawSeed)
console.info('seed', config.seed.length, config.seed)

export default config
