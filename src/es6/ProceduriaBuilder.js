import cfg from './config.js'
// import THREE from '../../node_modules/three/three.js'
import { THREE, scene } from './init.js'


class ProceduriaBuilder {
  getPositionAsVector3() {
    return new THREE.Vector3(
      this.position.x,
      this.position.y,
      this.position.z
    )
  }

  putBlock (position, index, size) {
    // if (cfg.debug)  console.info('putBlock', index, this.seed[index], position, size)
    let isQuarter = 0.5 === size.x && 0.5 === size.y && 0.5 === size.z
    let isHalf = 0.5 === size.x || 0.5 === size.y || 0.5 === size.z
    let isFull = 1 === size.x && 1 === size.y && 1 === size.z
    let c = isFull ? 0xffffff: isQuarter ? 0x777777:0x999999
    let subSegment = isFull ? 1:10
    let geometry = new THREE.BoxGeometry(
      size.x, size.y, size.z,
      subSegment, subSegment, subSegment
     )
    // let material = new THREE.MeshLambertMaterial( { color: c } )
    // let material = new THREE.MeshNormalMaterial( { wireframe: cfg.wireframe } )
    let material = new THREE.MeshPhongMaterial( {
      color: 0xdddddd,
      specular: 0x009900,
      shininess: 30,
      fog: true,
      shading: THREE.FlatShading
    } )
    // let material = new THREE.MeshDepthMaterial( { wireframe: cfg.wireframe } )
    // let material = new THREE.LineBasicMaterial( { fog: true })
    let cube = new THREE.Mesh( geometry, material )
    cube.castShadow = true
    cube.receiveShadow = true

    cube.position.x = (position.x + (size.x / 2)) - (cfg.size / 2)
    cube.position.y = (position.y + (size.y / 2))// - (cfg.size / 2)
    cube.position.z = (position.z + (size.z / 2)) - (cfg.size / 2)

    // if (cfg.debug)  console.info('cube.position:', cube.position)
    return scene.add( cube )
  }

  scan(max, step, callback) {
    /**
    * for every x in x, every y in h, every z in d, callback()
    **/
    let i = 0
    for (let x = 0; x < max; x += step) {
      for (let y = 0; y < max; y += step) {
        for (let z = 0; z < max; z += step) {
          callback(i, {x, y, z})
          // this.data.push({x, y, z, i})
          i++
        }
      }
    }
  }

  cubes() {
    this.data.forEach((data, index) => {
      this.data[index].id = this.putBlock(data, index, data.size)
    })
  }

  getBlockSize() {
    return { x: this.unit, y: this.unit, z: this.unit}
  }

  getHalfBlockSize(size, axisArray) {
    for (let axis in axisArray) {
      size[axis] /= 2
    }
    return size
  }

  constructor(seed, callbacks = {}) {
    if (cfg.debug)  console.info('new ProceduriaBuilder')
    this.data = []
    this.unit = 1
    this.up = 'y'
    this.seed = seed
    this.rawSeed = cfg.rawSeed
    this.level = {
      max: cfg.levelMax
    }
    // used for orbital camera controls
    this.position = { x: 0, y: 0, z: cfg.size / 2 }
    this.axes = ['x', 'y', 'z']
    let offset = 0.5
    this.offset = {
      'x': offset,
      'y': offset,
      'z': offset
    }
    this.subSeedsForHalfSize = {
      'x': [0x9, 0xa],
      'y': [0xb, 0xc],
      'z': [0xd, 0xe]
    }

    this.rules = [
      () => {
        if (cfg.debug) console.info('level 0: block occlusion')
        // cfg.debug = false
        this.scan(cfg.size, this.unit, (index, position) => {
          let size = { x: this.unit, y: this.unit, z: this.unit }
          let subSeed = this.rawSeed[index]
          var hexSubSeed = parseInt(`0x${subSeed}`, 16)
          // if (cfg.debug)  console.info('index:', index, 'subSeed:', subSeed, 'position:',position.x, position.y, position.z)

          let isQuarter = 0x1 <= subSeed && subSeed <= 0x8
          let isHalf = 0x9 <= subSeed && subSeed <= 0xe

          this.axes.forEach((axis) => {
            position[axis] += this.offset[axis]
            if (isQuarter)  size[axis] /= 2
          })

          if (0x0 !== hexSubSeed && 0xf !== hexSubSeed) {
            // if (cfg.debug)  console.info('doing sub blocks:', isQuarter ? 'quarter':'half', hexSubSeed, subSeed)

            if (isHalf) {
              if (0x9 === hexSubSeed || 0xa === hexSubSeed)  size.x /= 2
              if (0xb === hexSubSeed || 0xc === hexSubSeed)  size.y /= 2
              if (0xd === hexSubSeed || 0xe === hexSubSeed)  size.z /= 2
            }

            if (0x2 === hexSubSeed || 0x3 === hexSubSeed || 0x6 === hexSubSeed || 0x7 === hexSubSeed || 0xa === hexSubSeed) {
              position.x += size.x
            }
            if (0x3 === hexSubSeed || 0x4 === hexSubSeed || 0x7 === hexSubSeed || 0x8 === hexSubSeed || 0xc === hexSubSeed) {
              position.y += size.y
            }
            if ((isQuarter && 0x4 < hexSubSeed) || (isHalf && 0xe === hexSubSeed)) {
              position.z += size.z
            }
          }

          if (0x0 !== hexSubSeed) this.storeData(subSeed, position, size)
        })
      }
    ]
    if (cfg.debug)  console.info(`level.max: ${this.level.max}, seed: ${this.rawSeed}`)
  }

  storeData(subSeed, position, size) {
    size = size || this.getBlockSize()
    // if (cfg.debug)  console.info('storing', subSeed, position, size)
    this.data.push({
      x: position.x,
      y: position.y,
      z: position.z,
      subSeed: subSeed,
      size: size
    })
  }

  reset() {
    console.log(scene)
    this.data = []
    this.make()
  }

  make() {
    if (cfg.debug)  console.info('ProceduriaBuilder.make : generating content')
    for (var i = 0; i <= this.level.max; i++) {
      this.rules[i]()
    }
    this.data.forEach((data, index) => {
      this.data[index].id = this.putBlock(data, index, data.size)
    })
  }
}

export default ProceduriaBuilder
