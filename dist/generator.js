/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fsExtra = __webpack_require__(2);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _asyncWaterfall = __webpack_require__(61);

	var _asyncWaterfall2 = _interopRequireDefault(_asyncWaterfall);

	var _sha = __webpack_require__(62);

	var _sha2 = _interopRequireDefault(_sha);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.info('Proc.Edu.Ria');


	var size = 5;
	var cubicSize = Math.pow(size, 3);
	var mkSeed = function mkSeed(str) {
	  return (0, _sha2.default)(str).toString('hex');
	};
	var seedSource = 'proc.edu.ria';
	var rawSeed = mkSeed(seedSource);

	while (rawSeed.length < cubicSize.length) {
	  var remaining = cubicSize.length - rawSeed.length;
	  console.info('Filling up seed: ' + remaining + '/' + cubicSize);
	  rawSeed += mkSeed(rawSeed).substr(0, remaining);
	}

	var seed = rawSeed.substr(0, cubicSize);

	var cfg = {
	  size: size,
	  cubicSize: cubicSize,
	  seedSource: seedSource,
	  rawSeed: rawSeed,
	  seed: seed,
	  unit: 1
	};

	console.info('size:' + size + '\ncubicSize:' + cubicSize + '\nseedSource:' + seedSource + '\nseed:' + seed.length + ' => ' + seed);

	var rulesIndexFilename = './rules.json';
	var rulesIndexFound = _fsExtra2.default.existsSync(rulesIndexFilename);
	console.error(rulesIndexFound ? 'OK' : 'KO', 'looking for ' + rulesIndexFilename);

	if (!rulesIndexFound) {
	  process.exit(1);
	}

	var rulesIndex = _fsExtra2.default.readJsonSync(rulesIndexFilename);
	//console.info('rules:', rulesIndex)

	var rules = [];
	var data = [];

	var scan = function scan(max, step, callback) {
	  var i = 0;
	  for (var x = 0; x < max.length; x += step) {
	    for (var y = 0; y < max.length; y += step) {
	      for (var z = 0; z < max.length; z += step) {
	        console.log('scan', i, x, y, z);
	        callback(i, x, y, z);
	        i++;
	      }
	    }
	  }
	};

	var methods = {
	  scan: scan
	};

	rulesIndex.files.forEach(function (rule) {
	  var ruleFilename = './' + rulesIndex.path + '/' + rule.filename;
	  var ruleFileFound = _fsExtra2.default.existsSync(ruleFilename);
	  console.info(ruleFileFound ? 'OK' : 'KO', 'looking for ' + ruleFilename);
	  if (!ruleFileFound) {
	    process.exit(1);
	  } else {
	    var _rule = _fsExtra2.default.readJsonSync(ruleFilename);
	    while (rules.length < _rule.index) {
	      rules.push({});
	    }
	    _rule.cfg = cfg;
	    _rule.method = methods[_rule.method];
	    rules.push(_rule);
	  }
	});

	//console.info('rules:', rules)

	rules[0].method(cfg.unit, cfg.unit, function (i, x, y, z) {});

	/*
	let index = 0
	waterfall([
	  (next) => {
	    let rule = rules[index]
	    let callback = (i, x, y, z) => {
	console.log('callback', i, x, y, z)
	      console.info(i, x, y, z)
	    }
	    rule.method(rule.cfg.unit, rule.cfg.unit, callback)
	    index++
	    next(null, data)
	  }
	], (err, results) => {
	  console.log('err', err, 'results', results)
	})
	*/

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(3)

	var fse = {}
	var gfs = __webpack_require__(4)

	// attach fs methods to fse
	Object.keys(gfs).forEach(function (key) {
	  fse[key] = gfs[key]
	})

	var fs = fse

	assign(fs, __webpack_require__(13))
	assign(fs, __webpack_require__(22))
	assign(fs, __webpack_require__(19))
	assign(fs, __webpack_require__(25))
	assign(fs, __webpack_require__(41))
	assign(fs, __webpack_require__(46))
	assign(fs, __webpack_require__(47))
	assign(fs, __webpack_require__(49))
	assign(fs, __webpack_require__(50))
	assign(fs, __webpack_require__(57))
	assign(fs, __webpack_require__(58))

	module.exports = fs

	// maintain backwards compatibility for awhile
	var jsonfile = {}
	Object.defineProperty(jsonfile, 'spaces', {
	  get: function () {
	    return fs.spaces // found in ./json
	  },
	  set: function (val) {
	    fs.spaces = val
	  }
	})

	module.exports.jsonfile = jsonfile // so users of fs-extra can modify jsonFile.spaces


/***/ },
/* 3 */
/***/ function(module, exports) {

	// simple mutable assign
	function assign () {
	  var args = [].slice.call(arguments).filter(function (i) { return i })
	  var dest = args.shift()
	  args.forEach(function (src) {
	    Object.keys(src).forEach(function (key) {
	      dest[key] = src[key]
	    })
	  })

	  return dest
	}

	module.exports = assign


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(5)
	var polyfills = __webpack_require__(6)
	var legacy = __webpack_require__(9)
	var queue = []

	var util = __webpack_require__(11)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(12).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(7))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, cb) {
	    return go$readdir(path, cb)

	    function go$readdir () {
	      return fs$readdir(path, function (err, files) {
	        if (files && files.sort)
	          files.sort();  // Backwards compatibility with graceful-fs.

	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readdir, [path, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }


	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(7)
	var constants = __webpack_require__(8)

	var origCwd = process.cwd
	var cwd = null
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chownFix(fs.chmod)
	  fs.fchmod = chownFix(fs.fchmod)
	  fs.lchmod = chownFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chownFix(fs.chmodSync)
	  fs.fchmodSync = chownFix(fs.fchmodSync)
	  fs.lchmodSync = chownFix(fs.lchmodSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 1 second.
	  if (process.platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 1000) {
	          return fs$rename(from, to, CB)
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    callback = callback || noop
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        cb = cb || noop
	        if (er) return cb(er)
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            return cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er, res) {
	      if (chownErOk(er)) er = null
	      cb(er, res)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(5)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("constants");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(10).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  copy: __webpack_require__(14)
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var ncp = __webpack_require__(16)
	var mkdir = __webpack_require__(19)

	function copy (src, dest, options, callback) {
	  if (typeof options === 'function' && !callback) {
	    callback = options
	    options = {}
	  } else if (typeof options === 'function' || options instanceof RegExp) {
	    options = {filter: options}
	  }
	  callback = callback || function () {}
	  options = options || {}

	  // don't allow src and dest to be the same
	  var basePath = process.cwd()
	  var currentPath = path.resolve(basePath, src)
	  var targetPath = path.resolve(basePath, dest)
	  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

	  fs.lstat(src, function (err, stats) {
	    if (err) return callback(err)

	    var dir = null
	    if (stats.isDirectory()) {
	      var parts = dest.split(path.sep)
	      parts.pop()
	      dir = parts.join(path.sep)
	    } else {
	      dir = path.dirname(dest)
	    }

	    fs.exists(dir, function (dirExists) {
	      if (dirExists) return ncp(src, dest, options, callback)
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err)
	        ncp(src, dest, options, callback)
	      })
	    })
	  })
	}

	module.exports = copy


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// imported from ncp (this is temporary, will rewrite)

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var utimes = __webpack_require__(17)

	function ncp (source, dest, options, callback) {
	  if (!callback) {
	    callback = options
	    options = {}
	  }

	  var basePath = process.cwd()
	  var currentPath = path.resolve(basePath, source)
	  var targetPath = path.resolve(basePath, dest)

	  var filter = options.filter
	  var transform = options.transform
	  var clobber = options.clobber !== false
	  var dereference = options.dereference
	  var preserveTimestamps = options.preserveTimestamps === true

	  var errs = null

	  var started = 0
	  var finished = 0
	  var running = 0
	  // this is pretty useless now that we're using graceful-fs
	  // consider removing
	  var limit = options.limit || 512

	  startCopy(currentPath)

	  function startCopy (source) {
	    started++
	    if (filter) {
	      if (filter instanceof RegExp) {
	        if (!filter.test(source)) {
	          return doneOne(true)
	        }
	      } else if (typeof filter === 'function') {
	        if (!filter(source)) {
	          return doneOne(true)
	        }
	      }
	    }
	    return getStats(source)
	  }

	  function getStats (source) {
	    var stat = dereference ? fs.stat : fs.lstat
	    if (running >= limit) {
	      return setImmediate(function () {
	        getStats(source)
	      })
	    }
	    running++
	    stat(source, function (err, stats) {
	      if (err) return onError(err)

	      // We need to get the mode from the stats object and preserve it.
	      var item = {
	        name: source,
	        mode: stats.mode,
	        mtime: stats.mtime, // modified time
	        atime: stats.atime, // access time
	        stats: stats // temporary
	      }

	      if (stats.isDirectory()) {
	        return onDir(item)
	      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
	        return onFile(item)
	      } else if (stats.isSymbolicLink()) {
	        // Symlinks don't really need to know about the mode.
	        return onLink(source)
	      }
	    })
	  }

	  function onFile (file) {
	    var target = file.name.replace(currentPath, targetPath)
	    isWritable(target, function (writable) {
	      if (writable) {
	        copyFile(file, target)
	      } else {
	        if (clobber) {
	          rmFile(target, function () {
	            copyFile(file, target)
	          })
	        } else {
	          doneOne()
	        }
	      }
	    })
	  }

	  function copyFile (file, target) {
	    var readStream = fs.createReadStream(file.name)
	    var writeStream = fs.createWriteStream(target, { mode: file.mode })

	    readStream.on('error', onError)
	    writeStream.on('error', onError)

	    if (transform) {
	      transform(readStream, writeStream, file)
	    } else {
	      writeStream.on('open', function () {
	        readStream.pipe(writeStream)
	      })
	    }

	    writeStream.once('finish', function () {
	      fs.chmod(target, file.mode, function (err) {
	        if (err) return onError(err)
	        if (preserveTimestamps) {
	          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
	            if (err) return onError(err)
	            return doneOne()
	          })
	        } else {
	          doneOne()
	        }
	      })
	    })
	  }

	  function rmFile (file, done) {
	    fs.unlink(file, function (err) {
	      if (err) return onError(err)
	      return done()
	    })
	  }

	  function onDir (dir) {
	    var target = dir.name.replace(currentPath, targetPath)
	    isWritable(target, function (writable) {
	      if (writable) {
	        return mkDir(dir, target)
	      }
	      copyDir(dir.name)
	    })
	  }

	  function mkDir (dir, target) {
	    fs.mkdir(target, dir.mode, function (err) {
	      if (err) return onError(err)
	      // despite setting mode in fs.mkdir, doesn't seem to work
	      // so we set it here.
	      fs.chmod(target, dir.mode, function (err) {
	        if (err) return onError(err)
	        copyDir(dir.name)
	      })
	    })
	  }

	  function copyDir (dir) {
	    fs.readdir(dir, function (err, items) {
	      if (err) return onError(err)
	      items.forEach(function (item) {
	        startCopy(path.join(dir, item))
	      })
	      return doneOne()
	    })
	  }

	  function onLink (link) {
	    var target = link.replace(currentPath, targetPath)
	    fs.readlink(link, function (err, resolvedPath) {
	      if (err) return onError(err)
	      checkLink(resolvedPath, target)
	    })
	  }

	  function checkLink (resolvedPath, target) {
	    if (dereference) {
	      resolvedPath = path.resolve(basePath, resolvedPath)
	    }
	    isWritable(target, function (writable) {
	      if (writable) {
	        return makeLink(resolvedPath, target)
	      }
	      fs.readlink(target, function (err, targetDest) {
	        if (err) return onError(err)

	        if (dereference) {
	          targetDest = path.resolve(basePath, targetDest)
	        }
	        if (targetDest === resolvedPath) {
	          return doneOne()
	        }
	        return rmFile(target, function () {
	          makeLink(resolvedPath, target)
	        })
	      })
	    })
	  }

	  function makeLink (linkPath, target) {
	    fs.symlink(linkPath, target, function (err) {
	      if (err) return onError(err)
	      return doneOne()
	    })
	  }

	  function isWritable (path, done) {
	    fs.lstat(path, function (err) {
	      if (err) {
	        if (err.code === 'ENOENT') return done(true)
	        return done(false)
	      }
	      return done(false)
	    })
	  }

	  function onError (err) {
	    if (options.stopOnError) {
	      return callback(err)
	    } else if (!errs && options.errs) {
	      errs = fs.createWriteStream(options.errs)
	    } else if (!errs) {
	      errs = []
	    }
	    if (typeof errs.write === 'undefined') {
	      errs.push(err)
	    } else {
	      errs.write(err.stack + '\n\n')
	    }
	    return doneOne()
	  }

	  function doneOne (skipped) {
	    if (!skipped) running--
	    finished++
	    if ((started === finished) && (running === 0)) {
	      if (callback !== undefined) {
	        return errs ? callback(errs) : callback(null)
	      }
	    }
	  }
	}

	module.exports = ncp


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var os = __webpack_require__(18)

	// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
	function hasMillisResSync () {
	  var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
	  tmpfile = path.join(os.tmpdir(), tmpfile)

	  // 550 millis past UNIX epoch
	  var d = new Date(1435410243862)
	  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
	  var fd = fs.openSync(tmpfile, 'r+')
	  fs.futimesSync(fd, d, d)
	  fs.closeSync(fd)
	  return fs.statSync(tmpfile).mtime > 1435410243000
	}

	function hasMillisRes (callback) {
	  var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
	  tmpfile = path.join(os.tmpdir(), tmpfile)

	  // 550 millis past UNIX epoch
	  var d = new Date(1435410243862)
	  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
	    if (err) return callback(err)
	    fs.open(tmpfile, 'r+', function (err, fd) {
	      if (err) return callback(err)
	      fs.futimes(fd, d, d, function (err) {
	        if (err) return callback(err)
	        fs.close(fd, function (err) {
	          if (err) return callback(err)
	          fs.stat(tmpfile, function (err, stats) {
	            if (err) return callback(err)
	            callback(null, stats.mtime > 1435410243000)
	          })
	        })
	      })
	    })
	  })
	}

	function timeRemoveMillis (timestamp) {
	  if (typeof timestamp === 'number') {
	    return Math.floor(timestamp / 1000) * 1000
	  } else if (timestamp instanceof Date) {
	    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
	  } else {
	    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
	  }
	}

	function utimesMillis (path, atime, mtime, callback) {
	  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
	  fs.open(path, 'r+', function (err, fd) {
	    if (err) return callback(err)
	    fs.futimes(fd, atime, mtime, function (err) {
	      if (err) return callback(err)
	      fs.close(fd, callback)
	    })
	  })
	}

	module.exports = {
	  hasMillisRes: hasMillisRes,
	  hasMillisResSync: hasMillisResSync,
	  timeRemoveMillis: timeRemoveMillis,
	  utimesMillis: utimesMillis
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  mkdirs: __webpack_require__(20),
	  mkdirsSync: __webpack_require__(21),
	  // alias
	  mkdirp: __webpack_require__(20),
	  mkdirpSync: __webpack_require__(21),
	  ensureDir: __webpack_require__(20),
	  ensureDirSync: __webpack_require__(21)
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)

	var o777 = parseInt('0777', 8)

	function mkdirs (p, opts, callback, made) {
	  if (typeof opts === 'function') {
	    callback = opts
	    opts = {}
	  } else if (!opts || typeof opts !== 'object') {
	    opts = { mode: opts }
	  }

	  var mode = opts.mode
	  var xfs = opts.fs || fs

	  if (mode === undefined) {
	    mode = o777 & (~process.umask())
	  }
	  if (!made) made = null

	  callback = callback || function () {}
	  p = path.resolve(p)

	  xfs.mkdir(p, mode, function (er) {
	    if (!er) {
	      made = made || p
	      return callback(null, made)
	    }
	    switch (er.code) {
	      case 'ENOENT':
	        if (path.dirname(p) === p) return callback(er)
	        mkdirs(path.dirname(p), opts, function (er, made) {
	          if (er) callback(er, made)
	          else mkdirs(p, opts, callback, made)
	        })
	        break

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        xfs.stat(p, function (er2, stat) {
	          // if the stat fails, then that's super weird.
	          // let the original error be the failure reason.
	          if (er2 || !stat.isDirectory()) callback(er, made)
	          else callback(null, made)
	        })
	        break
	    }
	  })
	}

	module.exports = mkdirs


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)

	var o777 = parseInt('0777', 8)

	function mkdirsSync (p, opts, made) {
	  if (!opts || typeof opts !== 'object') {
	    opts = { mode: opts }
	  }

	  var mode = opts.mode
	  var xfs = opts.fs || fs

	  if (mode === undefined) {
	    mode = o777 & (~process.umask())
	  }
	  if (!made) made = null

	  p = path.resolve(p)

	  try {
	    xfs.mkdirSync(p, mode)
	    made = made || p
	  } catch (err0) {
	    switch (err0.code) {
	      case 'ENOENT' :
	        made = mkdirsSync(path.dirname(p), opts, made)
	        mkdirsSync(p, opts, made)
	        break

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        var stat
	        try {
	          stat = xfs.statSync(p)
	        } catch (err1) {
	          throw err0
	        }
	        if (!stat.isDirectory()) throw err0
	        break
	    }
	  }

	  return made
	}

	module.exports = mkdirsSync


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  copySync: __webpack_require__(23)
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var copyFileSync = __webpack_require__(24)
	var mkdir = __webpack_require__(19)

	function copySync (src, dest, options) {
	  if (typeof options === 'function' || options instanceof RegExp) {
	    options = {filter: options}
	  }

	  options = options || {}
	  options.recursive = !!options.recursive

	  // default to true for now
	  options.clobber = 'clobber' in options ? !!options.clobber : true
	  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

	  options.filter = options.filter || function () { return true }

	  var stats = options.recursive ? fs.lstatSync(src) : fs.statSync(src)
	  var destFolder = path.dirname(dest)
	  var destFolderExists = fs.existsSync(destFolder)
	  var performCopy = false

	  if (stats.isFile()) {
	    if (options.filter instanceof RegExp) performCopy = options.filter.test(src)
	    else if (typeof options.filter === 'function') performCopy = options.filter(src)

	    if (performCopy) {
	      if (!destFolderExists) mkdir.mkdirsSync(destFolder)
	      copyFileSync(src, dest, {clobber: options.clobber, preserveTimestamps: options.preserveTimestamps})
	    }
	  } else if (stats.isDirectory()) {
	    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
	    var contents = fs.readdirSync(src)
	    contents.forEach(function (content) {
	      var opts = options
	      opts.recursive = true
	      copySync(path.join(src, content), path.join(dest, content), opts)
	    })
	  } else if (options.recursive && stats.isSymbolicLink()) {
	    var srcPath = fs.readlinkSync(src)
	    fs.symlinkSync(srcPath, dest)
	  }
	}

	module.exports = copySync


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)

	var BUF_LENGTH = 64 * 1024
	var _buff = new Buffer(BUF_LENGTH)

	function copyFileSync (srcFile, destFile, options) {
	  var clobber = options.clobber
	  var preserveTimestamps = options.preserveTimestamps

	  if (fs.existsSync(destFile)) {
	    if (clobber) {
	      fs.chmodSync(destFile, parseInt('777', 8))
	      fs.unlinkSync(destFile)
	    } else {
	      throw Error('EEXIST')
	    }
	  }

	  var fdr = fs.openSync(srcFile, 'r')
	  var stat = fs.fstatSync(fdr)
	  var fdw = fs.openSync(destFile, 'w', stat.mode)
	  var bytesRead = 1
	  var pos = 0

	  while (bytesRead > 0) {
	    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
	    fs.writeSync(fdw, _buff, 0, bytesRead)
	    pos += bytesRead
	  }

	  if (preserveTimestamps) {
	    fs.futimesSync(fdw, stat.atime, stat.mtime)
	  }

	  fs.closeSync(fdr)
	  fs.closeSync(fdw)
	}

	module.exports = copyFileSync


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var rimraf = __webpack_require__(26)

	function removeSync (dir) {
	  return rimraf.sync(dir)
	}

	function remove (dir, callback) {
	  return callback ? rimraf(dir, callback) : rimraf(dir, function () {})
	}

	module.exports = {
	  remove: remove,
	  removeSync: removeSync
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = rimraf
	rimraf.sync = rimrafSync

	var assert = __webpack_require__(12)
	var path = __webpack_require__(15)
	var fs = __webpack_require__(5)
	var glob = __webpack_require__(27)

	var defaultGlobOpts = {
	  nosort: true,
	  silent: true
	}

	// for EMFILE handling
	var timeout = 0

	var isWindows = (process.platform === "win32")

	function defaults (options) {
	  var methods = [
	    'unlink',
	    'chmod',
	    'stat',
	    'lstat',
	    'rmdir',
	    'readdir'
	  ]
	  methods.forEach(function(m) {
	    options[m] = options[m] || fs[m]
	    m = m + 'Sync'
	    options[m] = options[m] || fs[m]
	  })

	  options.maxBusyTries = options.maxBusyTries || 3
	  options.emfileWait = options.emfileWait || 1000
	  if (options.glob === false) {
	    options.disableGlob = true
	  }
	  options.disableGlob = options.disableGlob || false
	  options.glob = options.glob || defaultGlobOpts
	}

	function rimraf (p, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = {}
	  }

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')
	  assert.equal(typeof cb, 'function', 'rimraf: callback function required')

	  defaults(options)

	  var busyTries = 0
	  var errState = null
	  var n = 0

	  if (options.disableGlob || !glob.hasMagic(p))
	    return afterGlob(null, [p])

	  fs.lstat(p, function (er, stat) {
	    if (!er)
	      return afterGlob(null, [p])

	    glob(p, options.glob, afterGlob)
	  })

	  function next (er) {
	    errState = errState || er
	    if (--n === 0)
	      cb(errState)
	  }

	  function afterGlob (er, results) {
	    if (er)
	      return cb(er)

	    n = results.length
	    if (n === 0)
	      return cb()

	    results.forEach(function (p) {
	      rimraf_(p, options, function CB (er) {
	        if (er) {
	          if (isWindows && (er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
	              busyTries < options.maxBusyTries) {
	            busyTries ++
	            var time = busyTries * 100
	            // try again, with the same exact callback as this one.
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, time)
	          }

	          // this one won't happen if graceful-fs is used.
	          if (er.code === "EMFILE" && timeout < options.emfileWait) {
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, timeout ++)
	          }

	          // already gone
	          if (er.code === "ENOENT") er = null
	        }

	        timeout = 0
	        next(er)
	      })
	    })
	  }
	}

	// Two possible strategies.
	// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
	// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
	//
	// Both result in an extra syscall when you guess wrong.  However, there
	// are likely far more normal files in the world than directories.  This
	// is based on the assumption that a the average number of files per
	// directory is >= 1.
	//
	// If anyone ever complains about this, then I guess the strategy could
	// be made configurable somehow.  But until then, YAGNI.
	function rimraf_ (p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  // sunos lets the root user unlink directories, which is... weird.
	  // so we have to lstat here and make sure it's not a dir.
	  options.lstat(p, function (er, st) {
	    if (er && er.code === "ENOENT")
	      return cb(null)

	    if (st && st.isDirectory())
	      return rmdir(p, options, er, cb)

	    options.unlink(p, function (er) {
	      if (er) {
	        if (er.code === "ENOENT")
	          return cb(null)
	        if (er.code === "EPERM")
	          return (isWindows)
	            ? fixWinEPERM(p, options, er, cb)
	            : rmdir(p, options, er, cb)
	        if (er.code === "EISDIR")
	          return rmdir(p, options, er, cb)
	      }
	      return cb(er)
	    })
	  })
	}

	function fixWinEPERM (p, options, er, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')
	  if (er)
	    assert(er instanceof Error)

	  options.chmod(p, 666, function (er2) {
	    if (er2)
	      cb(er2.code === "ENOENT" ? null : er)
	    else
	      options.stat(p, function(er3, stats) {
	        if (er3)
	          cb(er3.code === "ENOENT" ? null : er)
	        else if (stats.isDirectory())
	          rmdir(p, options, er, cb)
	        else
	          options.unlink(p, cb)
	      })
	  })
	}

	function fixWinEPERMSync (p, options, er) {
	  assert(p)
	  assert(options)
	  if (er)
	    assert(er instanceof Error)

	  try {
	    options.chmodSync(p, 666)
	  } catch (er2) {
	    if (er2.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  try {
	    var stats = options.statSync(p)
	  } catch (er3) {
	    if (er3.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  if (stats.isDirectory())
	    rmdirSync(p, options, er)
	  else
	    options.unlinkSync(p)
	}

	function rmdir (p, options, originalEr, cb) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)
	  assert(typeof cb === 'function')

	  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
	  // if we guessed wrong, and it's not a directory, then
	  // raise the original error.
	  options.rmdir(p, function (er) {
	    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
	      rmkids(p, options, cb)
	    else if (er && er.code === "ENOTDIR")
	      cb(originalEr)
	    else
	      cb(er)
	  })
	}

	function rmkids(p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  options.readdir(p, function (er, files) {
	    if (er)
	      return cb(er)
	    var n = files.length
	    if (n === 0)
	      return options.rmdir(p, cb)
	    var errState
	    files.forEach(function (f) {
	      rimraf(path.join(p, f), options, function (er) {
	        if (errState)
	          return
	        if (er)
	          return cb(errState = er)
	        if (--n === 0)
	          options.rmdir(p, cb)
	      })
	    })
	  })
	}

	// this looks simpler, and is strictly *faster*, but will
	// tie up the JavaScript thread and fail on excessively
	// deep directory trees.
	function rimrafSync (p, options) {
	  options = options || {}
	  defaults(options)

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  var results

	  if (options.disableGlob || !glob.hasMagic(p)) {
	    results = [p]
	  } else {
	    try {
	      fs.lstatSync(p)
	      results = [p]
	    } catch (er) {
	      results = glob.sync(p, options.glob)
	    }
	  }

	  if (!results.length)
	    return

	  for (var i = 0; i < results.length; i++) {
	    var p = results[i]

	    try {
	      var st = options.lstatSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	    }

	    try {
	      // sunos lets the root user unlink directories, which is... weird.
	      if (st && st.isDirectory())
	        rmdirSync(p, options, null)
	      else
	        options.unlinkSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	      if (er.code === "EPERM")
	        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
	      if (er.code !== "EISDIR")
	        throw er
	      rmdirSync(p, options, er)
	    }
	  }
	}

	function rmdirSync (p, options, originalEr) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)

	  try {
	    options.rmdirSync(p)
	  } catch (er) {
	    if (er.code === "ENOENT")
	      return
	    if (er.code === "ENOTDIR")
	      throw originalEr
	    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
	      rmkidsSync(p, options)
	  }
	}

	function rmkidsSync (p, options) {
	  assert(p)
	  assert(options)
	  options.readdirSync(p).forEach(function (f) {
	    rimrafSync(path.join(p, f), options)
	  })
	  options.rmdirSync(p, options)
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	module.exports = glob

	var fs = __webpack_require__(5)
	var minimatch = __webpack_require__(28)
	var Minimatch = minimatch.Minimatch
	var inherits = __webpack_require__(32)
	var EE = __webpack_require__(33).EventEmitter
	var path = __webpack_require__(15)
	var assert = __webpack_require__(12)
	var isAbsolute = __webpack_require__(34)
	var globSync = __webpack_require__(35)
	var common = __webpack_require__(36)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var inflight = __webpack_require__(37)
	var util = __webpack_require__(11)
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	var once = __webpack_require__(39)

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {}
	  if (!options) options = {}

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync
	var GlobSync = glob.GlobSync = globSync.GlobSync

	// old api surface
	glob.glob = glob

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add)
	  var i = keys.length
	  while (i--) {
	    origin[keys[i]] = add[keys[i]]
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_)
	  options.noprocess = true

	  var g = new Glob(pattern, options)
	  var set = g.minimatch.set
	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	}

	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = null
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options)
	  this._didRealPath = false

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)

	  if (typeof cb === 'function') {
	    cb = once(cb)
	    this.on('error', cb)
	    this.on('end', function (matches) {
	      cb(null, matches)
	    })
	  }

	  var self = this
	  var n = this.minimatch.set.length
	  this._processing = 0
	  this.matches = new Array(n)

	  this._emitQueue = []
	  this._processQueue = []
	  this.paused = false

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done)
	  }
	  sync = false

	  function done () {
	    --self._processing
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish()
	        })
	      } else {
	        self._finish()
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common.finish(this)
	  this.emit('end', this.found)
	}

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true

	  var n = this.matches.length
	  if (n === 0)
	    return this._finish()

	  var self = this
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next)

	  function next () {
	    if (--n === 0)
	      self._finish()
	  }
	}

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index]
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset)
	  var self = this
	  var n = found.length

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null)
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p)
	    fs.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true
	      else if (er.syscall === 'stat')
	        set[p] = true
	      else
	        self.emit('error', er) // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set
	        cb()
	      }
	    })
	  })
	}

	Glob.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	Glob.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}

	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit('abort')
	}

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true
	    this.emit('pause')
	  }
	}

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume')
	    this.paused = false
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0)
	      this._emitQueue.length = 0
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i]
	        this._emitMatch(e[0], e[1])
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0)
	      this._processQueue.length = 0
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i]
	        this._processing--
	        this._process(p[0], p[1], p[2], p[3])
	      }
	    }
	  }
	}

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob)
	  assert(typeof cb === 'function')

	  if (this.aborted)
	    return

	  this._processing++
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb])
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
	}

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e
	      else
	        e = prefix + e
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb)
	  }
	  cb()
	}

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (this.matches[index][e])
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e])
	    return
	  }

	  var abs = this._makeAbs(e)

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  if (this.mark)
	    e = this._mark(e)

	  this.matches[index][e] = true

	  var st = this.statCache[abs]
	  if (st)
	    this.emit('stat', e, st)

	  this.emit('match', e)
	}

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs
	  var self = this
	  var lstatcb = inflight(lstatkey, lstatcb_)

	  if (lstatcb)
	    fs.lstat(abs, lstatcb)

	  function lstatcb_ (er, lstat) {
	    if (er)
	      return cb()

	    var isSym = lstat.isSymbolicLink()
	    self.symlinks[abs] = isSym

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE'
	      cb()
	    } else
	      self._readdir(abs, false, cb)
	  }
	}

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }

	  var self = this
	  fs.readdir(abs, readdirCb(this, abs, cb))
	}

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb)
	    else
	      self._readdirEntries(abs, entries, cb)
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries
	  return cb(null, entries)
	}

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        this.emit('error', error)
	        this.abort()
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict) {
	        this.emit('error', er)
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort()
	      }
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }

	  return cb()
	}

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb)

	  var isSym = this.symlinks[abs]
	  var len = entries.length

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true, cb)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true, cb)
	  }

	  cb()
	}

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb)
	  })
	}
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	  cb()
	}

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE'
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this
	  var statcb = inflight('stat\0' + abs, lstatcb_)
	  if (statcb)
	    fs.lstat(abs, statcb)

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb)
	        else
	          self._stat2(f, abs, er, stat, cb)
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb)
	    }
	  }
	}

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er) {
	    this.statCache[abs] = false
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/'
	  this.statCache[abs] = stat

	  if (abs.slice(-1) === '/' && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c !== 'DIR')
	    return cb()

	  return cb(null, c, stat)
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = minimatch
	minimatch.Minimatch = Minimatch

	var path = { sep: '/' }
	try {
	  path = __webpack_require__(15)
	} catch (er) {}

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	var expand = __webpack_require__(29)

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]'

	// * => any number of characters
	var star = qmark + '*?'

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!')

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/

	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }

	  return m
	}

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}

	function minimatch (p, pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === '') return p === ''

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}
	  pattern = pattern.trim()

	  // windows support: need to use /, not \
	  if (path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/')
	  }

	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false

	  // make the set of regexps etc.
	  this.make()
	}

	Minimatch.prototype.debug = function () {}

	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern
	  var options = this.options

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate()

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()

	  if (options.debug) this.debug = console.error

	  this.debug(this.pattern, set)

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })

	  this.debug(this.pattern, set)

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)

	  this.debug(this.pattern, set)

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  })

	  this.debug(this.pattern, set)

	  this.set = set
	}

	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	  var negate = false
	  var options = this.options
	  var negateOffset = 0

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate
	    negateOffset++
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	}

	Minimatch.prototype.braceExpand = braceExpand

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options
	    } else {
	      options = {}
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern

	  if (typeof pattern === 'undefined') {
	    throw new Error('undefined pattern')
	  }

	  if (options.nobrace ||
	    !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  var options = this.options

	  // shortcuts
	  if (!options.noglobstar && pattern === '**') return GLOBSTAR
	  if (pattern === '') return ''

	  var re = ''
	  var hasMagic = !!options.nocase
	  var escaping = false
	  // ? => one single character
	  var patternListStack = []
	  var negativeLists = []
	  var plType
	  var stateChar
	  var inClass = false
	  var reClassStart = -1
	  var classStart = -1
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)'
	  var self = this

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star
	          hasMagic = true
	        break
	        case '?':
	          re += qmark
	          hasMagic = true
	        break
	        default:
	          re += '\\' + stateChar
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c)

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c
	      escaping = false
	      continue
	    }

	    switch (c) {
	      case '/':
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case '\\':
	        clearStateChar()
	        escaping = true
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === '!' && i === classStart + 1) c = '^'
	          re += c
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	      continue

	      case '(':
	        if (inClass) {
	          re += '('
	          continue
	        }

	        if (!stateChar) {
	          re += '\\('
	          continue
	        }

	        plType = stateChar
	        patternListStack.push({
	          type: plType,
	          start: i - 1,
	          reStart: re.length
	        })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)'
	          continue
	        }

	        clearStateChar()
	        hasMagic = true
	        re += ')'
	        var pl = patternListStack.pop()
	        plType = pl.type
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        switch (plType) {
	          case '!':
	            negativeLists.push(pl)
	            re += ')[^/]*?)'
	            pl.reEnd = re.length
	            break
	          case '?':
	          case '+':
	          case '*':
	            re += plType
	            break
	          case '@': break // the default anyway
	        }
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|'
	          escaping = false
	          continue
	        }

	        clearStateChar()
	        re += '|'
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar()

	        if (inClass) {
	          re += '\\' + c
	          continue
	        }

	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c
	          escaping = false
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        if (inClass) {
	          // split where the last [ was, make sure we don't have
	          // an invalid re. if so, re-walk the contents of the
	          // would-be class to re-translate any characters that
	          // were passed through as-is
	          // TODO: It would probably be faster to determine this
	          // without a try/catch and a new RegExp, but it's tricky
	          // to do safely.  For now, this is safe and works.
	          var cs = pattern.substring(classStart + 1, i)
	          try {
	            RegExp('[' + cs + ']')
	          } catch (er) {
	            // not a valid class!
	            var sp = this.parse(cs, SUBPARSE)
	            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
	            hasMagic = hasMagic || sp[1]
	            inClass = false
	            continue
	          }
	        }

	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()

	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\'
	        }

	        re += c

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1)
	    sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + '\\[' + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + 3)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\'
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    })

	    this.debug('tail=%j\n   %s', tail, tail)
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type

	    hasMagic = true
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += '\\\\'
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case '.':
	    case '[':
	    case '(': addPatternStart = true
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n]

	    var nlBefore = re.slice(0, nl.reStart)
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
	    var nlAfter = re.slice(nl.reEnd)

	    nlLast += nlAfter

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1
	    var cleanAfter = nlAfter
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
	    }
	    nlAfter = cleanAfter

	    var dollar = ''
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$'
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
	    re = newRe
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re
	  }

	  if (addPatternStart) {
	    re = patternStart + re
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : ''
	  var regExp = new RegExp('^' + re + '$', flags)

	  regExp._glob = pattern
	  regExp._src = re

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}

	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set

	  if (!set.length) {
	    this.regexp = false
	    return this.regexp
	  }
	  var options = this.options

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot
	  var flags = options.nocase ? 'i' : ''

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|')

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$'

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$'

	  try {
	    this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    this.regexp = false
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {}
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}

	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug('match', f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/')
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, 'split', f)

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set
	  this.debug(this.pattern, 'set', set)

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename
	  var i
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i]
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i]
	    var file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename]
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern })

	  this.debug('matchOne', file.length, pattern.length)

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop')
	    var p = pattern[pi]
	    var f = file[fi]

	    this.debug(pattern, p, f)

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	      var pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr]

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr)
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr++
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === 'string') {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug('string match', p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug('pattern match', p, f, hit)
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error('wtf?')
	}

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var concatMap = __webpack_require__(30);
	var balanced = __webpack_require__(31);

	module.exports = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function identity(e) {
	  return e;
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = /^(.*,)+(.+)?$/.test(m.body);
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length)
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}



/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = balanced;
	function balanced(a, b, str) {
	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    begs = [];
	    left = str.length;

	    while (i < str.length && i >= 0 && ! result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).inherits


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	};

	function win32(path) {
		// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = !!device && device.charAt(1) !== ':';

		// UNC paths are always absolute
		return !!result[2] || isUnc;
	};

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = globSync
	globSync.GlobSync = GlobSync

	var fs = __webpack_require__(5)
	var minimatch = __webpack_require__(28)
	var Minimatch = minimatch.Minimatch
	var Glob = __webpack_require__(27).Glob
	var util = __webpack_require__(11)
	var path = __webpack_require__(15)
	var assert = __webpack_require__(12)
	var isAbsolute = __webpack_require__(34)
	var common = __webpack_require__(36)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var childrenIgnored = common.childrenIgnored

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options)

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length
	  this.matches = new Array(n)
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false)
	  }
	  this._finish()
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync)
	  if (this.realpath) {
	    var self = this
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null)
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p)
	          var real = fs.realpathSync(p, self.realpathCache)
	          set[real] = true
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true
	          else
	            throw er
	        }
	      }
	    })
	  }
	  common.finish(this)
	}


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
	}


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar)

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this.matches[index][e] = true
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix)
	      newPattern = [prefix, e]
	    else
	      newPattern = [e]
	    this._process(newPattern.concat(remain), index, inGlobStar)
	  }
	}


	GlobSync.prototype._emitMatch = function (index, e) {
	  var abs = this._makeAbs(e)
	  if (this.mark)
	    e = this._mark(e)

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[this._makeAbs(e)]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true
	  if (this.stat)
	    this._stat(e)
	}


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries
	  var lstat
	  var stat
	  try {
	    lstat = fs.lstatSync(abs)
	  } catch (er) {
	    // lstat failed, doesn't exist
	    return null
	  }

	  var isSym = lstat.isSymbolicLink()
	  this.symlinks[abs] = isSym

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && !lstat.isDirectory())
	    this.cache[abs] = 'FILE'
	  else
	    entries = this._readdir(abs, false)

	  return entries
	}

	GlobSync.prototype._readdir = function (abs, inGlobStar) {
	  var entries

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er)
	    return null
	  }
	}

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries

	  // mark and cache dir-ness
	  return entries
	}

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }
	}

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false)

	  var len = entries.length
	  var isSym = this.symlinks[abs]

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true)
	  }
	}

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this.matches[index][prefix] = true
	}

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (!stat) {
	    var lstat
	    try {
	      lstat = fs.lstatSync(abs)
	    } catch (er) {
	      return false
	    }

	    if (lstat.isSymbolicLink()) {
	      try {
	        stat = fs.statSync(abs)
	      } catch (er) {
	        stat = lstat
	      }
	    } else {
	      stat = lstat
	    }
	  }

	  this.statCache[abs] = stat

	  var c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c !== 'DIR')
	    return false

	  return c
	}

	GlobSync.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	GlobSync.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports.alphasort = alphasort
	exports.alphasorti = alphasorti
	exports.setopts = setopts
	exports.ownProp = ownProp
	exports.makeAbs = makeAbs
	exports.finish = finish
	exports.mark = mark
	exports.isIgnored = isIgnored
	exports.childrenIgnored = childrenIgnored

	function ownProp (obj, field) {
	  return Object.prototype.hasOwnProperty.call(obj, field)
	}

	var path = __webpack_require__(15)
	var minimatch = __webpack_require__(28)
	var isAbsolute = __webpack_require__(34)
	var Minimatch = minimatch.Minimatch

	function alphasorti (a, b) {
	  return a.toLowerCase().localeCompare(b.toLowerCase())
	}

	function alphasort (a, b) {
	  return a.localeCompare(b)
	}

	function setupIgnores (self, options) {
	  self.ignore = options.ignore || []

	  if (!Array.isArray(self.ignore))
	    self.ignore = [self.ignore]

	  if (self.ignore.length) {
	    self.ignore = self.ignore.map(ignoreMap)
	  }
	}

	// ignore patterns are always in dot:true mode.
	function ignoreMap (pattern) {
	  var gmatcher = null
	  if (pattern.slice(-3) === '/**') {
	    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
	    gmatcher = new Minimatch(gpattern, { dot: true })
	  }

	  return {
	    matcher: new Minimatch(pattern, { dot: true }),
	    gmatcher: gmatcher
	  }
	}

	function setopts (self, pattern, options) {
	  if (!options)
	    options = {}

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }

	  self.silent = !!options.silent
	  self.pattern = pattern
	  self.strict = options.strict !== false
	  self.realpath = !!options.realpath
	  self.realpathCache = options.realpathCache || Object.create(null)
	  self.follow = !!options.follow
	  self.dot = !!options.dot
	  self.mark = !!options.mark
	  self.nodir = !!options.nodir
	  if (self.nodir)
	    self.mark = true
	  self.sync = !!options.sync
	  self.nounique = !!options.nounique
	  self.nonull = !!options.nonull
	  self.nosort = !!options.nosort
	  self.nocase = !!options.nocase
	  self.stat = !!options.stat
	  self.noprocess = !!options.noprocess

	  self.maxLength = options.maxLength || Infinity
	  self.cache = options.cache || Object.create(null)
	  self.statCache = options.statCache || Object.create(null)
	  self.symlinks = options.symlinks || Object.create(null)

	  setupIgnores(self, options)

	  self.changedCwd = false
	  var cwd = process.cwd()
	  if (!ownProp(options, "cwd"))
	    self.cwd = cwd
	  else {
	    self.cwd = path.resolve(options.cwd)
	    self.changedCwd = self.cwd !== cwd
	  }

	  self.root = options.root || path.resolve(self.cwd, "/")
	  self.root = path.resolve(self.root)
	  if (process.platform === "win32")
	    self.root = self.root.replace(/\\/g, "/")

	  self.cwdAbs = makeAbs(self, self.cwd)
	  self.nomount = !!options.nomount

	  // disable comments and negation in Minimatch.
	  // Note that they are not supported in Glob itself anyway.
	  options.nonegate = true
	  options.nocomment = true

	  self.minimatch = new Minimatch(pattern, options)
	  self.options = self.minimatch.options
	}

	function finish (self) {
	  var nou = self.nounique
	  var all = nou ? [] : Object.create(null)

	  for (var i = 0, l = self.matches.length; i < l; i ++) {
	    var matches = self.matches[i]
	    if (!matches || Object.keys(matches).length === 0) {
	      if (self.nonull) {
	        // do like the shell, and spit out the literal glob
	        var literal = self.minimatch.globSet[i]
	        if (nou)
	          all.push(literal)
	        else
	          all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou)
	        all.push.apply(all, m)
	      else
	        m.forEach(function (m) {
	          all[m] = true
	        })
	    }
	  }

	  if (!nou)
	    all = Object.keys(all)

	  if (!self.nosort)
	    all = all.sort(self.nocase ? alphasorti : alphasort)

	  // at *some* point we statted all of these
	  if (self.mark) {
	    for (var i = 0; i < all.length; i++) {
	      all[i] = self._mark(all[i])
	    }
	    if (self.nodir) {
	      all = all.filter(function (e) {
	        var notDir = !(/\/$/.test(e))
	        var c = self.cache[e] || self.cache[makeAbs(self, e)]
	        if (notDir && c)
	          notDir = c !== 'DIR' && !Array.isArray(c)
	        return notDir
	      })
	    }
	  }

	  if (self.ignore.length)
	    all = all.filter(function(m) {
	      return !isIgnored(self, m)
	    })

	  self.found = all
	}

	function mark (self, p) {
	  var abs = makeAbs(self, p)
	  var c = self.cache[abs]
	  var m = p
	  if (c) {
	    var isDir = c === 'DIR' || Array.isArray(c)
	    var slash = p.slice(-1) === '/'

	    if (isDir && !slash)
	      m += '/'
	    else if (!isDir && slash)
	      m = m.slice(0, -1)

	    if (m !== p) {
	      var mabs = makeAbs(self, m)
	      self.statCache[mabs] = self.statCache[abs]
	      self.cache[mabs] = self.cache[abs]
	    }
	  }

	  return m
	}

	// lotta situps...
	function makeAbs (self, f) {
	  var abs = f
	  if (f.charAt(0) === '/') {
	    abs = path.join(self.root, f)
	  } else if (isAbsolute(f) || f === '') {
	    abs = f
	  } else if (self.changedCwd) {
	    abs = path.resolve(self.cwd, f)
	  } else {
	    abs = path.resolve(f)
	  }

	  if (process.platform === 'win32')
	    abs = abs.replace(/\\/g, '/')

	  return abs
	}


	// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
	// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
	function isIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	function childrenIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(38)
	var reqs = Object.create(null)
	var once = __webpack_require__(39)

	module.exports = wrappy(inflight)

	function inflight (key, cb) {
	  if (reqs[key]) {
	    reqs[key].push(cb)
	    return null
	  } else {
	    reqs[key] = [cb]
	    return makeres(key)
	  }
	}

	function makeres (key) {
	  return once(function RES () {
	    var cbs = reqs[key]
	    var len = cbs.length
	    var args = slice(arguments)
	    for (var i = 0; i < len; i++) {
	      cbs[i].apply(null, args)
	    }
	    if (cbs.length > len) {
	      // added more in the interim.
	      // de-zalgo, just in case, but don't call again.
	      cbs.splice(0, len)
	      process.nextTick(function () {
	        RES.apply(null, args)
	      })
	    } else {
	      delete reqs[key]
	    }
	  })
	}

	function slice (args) {
	  var length = args.length
	  var array = []

	  for (var i = 0; i < length; i++) array[i] = args[i]
	  return array
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(40)
	module.exports = wrappy(once)

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})

	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}


/***/ },
/* 40 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var jsonFile = __webpack_require__(42)

	jsonFile.outputJsonSync = __webpack_require__(44)
	jsonFile.outputJson = __webpack_require__(45)
	// aliases
	jsonFile.outputJSONSync = __webpack_require__(44)
	jsonFile.outputJSON = __webpack_require__(45)

	module.exports = jsonFile


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var jsonFile = __webpack_require__(43)

	module.exports = {
	  // jsonfile exports
	  readJson: jsonFile.readFile,
	  readJSON: jsonFile.readFile,
	  readJsonSync: jsonFile.readFileSync,
	  readJSONSync: jsonFile.readFileSync,
	  writeJson: jsonFile.writeFile,
	  writeJSON: jsonFile.writeFile,
	  writeJsonSync: jsonFile.writeFileSync,
	  writeJSONSync: jsonFile.writeFileSync,
	  spaces: 2 // default in fs-extra
	}


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(5)

	function readFile (file, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }

	  fs.readFile(file, options, function (err, data) {
	    if (err) return callback(err)

	    var obj
	    try {
	      obj = JSON.parse(data, options ? options.reviver : null)
	    } catch (err2) {
	      err2.message = file + ': ' + err2.message
	      return callback(err2)
	    }

	    callback(null, obj)
	  })
	}

	function readFileSync (file, options) {
	  options = options || {}
	  if (typeof options === 'string') {
	    options = {encoding: options}
	  }

	  var shouldThrow = 'throws' in options ? options.throws : true
	  var content = fs.readFileSync(file, options)

	  try {
	    return JSON.parse(content, options.reviver)
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = file + ': ' + err.message
	      throw err
	    } else {
	      return null
	    }
	  }
	}

	function writeFile (file, obj, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = ''
	  try {
	    str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
	  } catch (err) {
	    if (callback) return callback(err, null)
	  }

	  fs.writeFile(file, str, options, callback)
	}

	function writeFileSync (file, obj, options) {
	  options = options || {}

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
	  // not sure if fs.writeFileSync returns anything, but just in case
	  return fs.writeFileSync(file, str, options)
	}

	var jsonfile = {
	  spaces: null,
	  readFile: readFile,
	  readFileSync: readFileSync,
	  writeFile: writeFile,
	  writeFileSync: writeFileSync
	}

	module.exports = jsonfile


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var jsonFile = __webpack_require__(42)
	var mkdir = __webpack_require__(19)

	function outputJsonSync (file, data, options) {
	  var dir = path.dirname(file)

	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir)
	  }

	  jsonFile.writeJsonSync(file, data, options)
	}

	module.exports = outputJsonSync


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	var path = __webpack_require__(15)
	var jsonFile = __webpack_require__(42)
	var mkdir = __webpack_require__(19)

	function outputJson (file, data, options, callback) {
	  if (typeof options === 'function') {
	    callback = options
	    options = {}
	  }

	  var dir = path.dirname(file)

	  fs.exists(dir, function (itDoes) {
	    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err)
	      jsonFile.writeJson(file, data, options, callback)
	    })
	  })
	}

	module.exports = outputJson


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// most of this code was written by Andrew Kelley
	// licensed under the BSD license: see
	// https://github.com/andrewrk/node-mv/blob/master/package.json

	// this needs a cleanup

	var fs = __webpack_require__(4)
	var ncp = __webpack_require__(16)
	var path = __webpack_require__(15)
	var rimraf = __webpack_require__(26)
	var mkdirp = __webpack_require__(19).mkdirs

	function mv (source, dest, options, callback) {
	  if (typeof options === 'function') {
	    callback = options
	    options = {}
	  }

	  var shouldMkdirp = ('mkdirp' in options) ? options.mkdirp : true
	  var clobber = ('clobber' in options) ? options.clobber : false

	  var limit = options.limit || 16

	  if (shouldMkdirp) {
	    mkdirs()
	  } else {
	    doRename()
	  }

	  function mkdirs () {
	    mkdirp(path.dirname(dest), function (err) {
	      if (err) return callback(err)
	      doRename()
	    })
	  }

	  function doRename () {
	    if (clobber) {
	      fs.rename(source, dest, function (err) {
	        if (!err) return callback()

	        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
	          rimraf(dest, function (err) {
	            if (err) return callback(err)
	            options.clobber = false // just clobbered it, no need to do it again
	            mv(source, dest, options, callback)
	          })
	          return
	        }

	        // weird Windows shit
	        if (err.code === 'EPERM') {
	          setTimeout(function () {
	            rimraf(dest, function (err) {
	              if (err) return callback(err)
	              options.clobber = false
	              mv(source, dest, options, callback)
	            })
	          }, 200)
	          return
	        }

	        if (err.code !== 'EXDEV') return callback(err)
	        moveAcrossDevice(source, dest, clobber, limit, callback)
	      })
	    } else {
	      fs.link(source, dest, function (err) {
	        if (err) {
	          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM') {
	            moveAcrossDevice(source, dest, clobber, limit, callback)
	            return
	          }
	          callback(err)
	          return
	        }
	        fs.unlink(source, callback)
	      })
	    }
	  }
	}

	function moveAcrossDevice (source, dest, clobber, limit, callback) {
	  fs.stat(source, function (err, stat) {
	    if (err) {
	      callback(err)
	      return
	    }

	    if (stat.isDirectory()) {
	      moveDirAcrossDevice(source, dest, clobber, limit, callback)
	    } else {
	      moveFileAcrossDevice(source, dest, clobber, limit, callback)
	    }
	  })
	}

	function moveFileAcrossDevice (source, dest, clobber, limit, callback) {
	  var outFlags = clobber ? 'w' : 'wx'
	  var ins = fs.createReadStream(source)
	  var outs = fs.createWriteStream(dest, {flags: outFlags})

	  ins.on('error', function (err) {
	    ins.destroy()
	    outs.destroy()
	    outs.removeListener('close', onClose)

	    // may want to create a directory but `out` line above
	    // creates an empty file for us: See #108
	    // don't care about error here
	    fs.unlink(dest, function () {
	      // note: `err` here is from the input stream errror
	      if (err.code === 'EISDIR' || err.code === 'EPERM') {
	        moveDirAcrossDevice(source, dest, clobber, limit, callback)
	      } else {
	        callback(err)
	      }
	    })
	  })

	  outs.on('error', function (err) {
	    ins.destroy()
	    outs.destroy()
	    outs.removeListener('close', onClose)
	    callback(err)
	  })

	  outs.once('close', onClose)
	  ins.pipe(outs)

	  function onClose () {
	    fs.unlink(source, callback)
	  }
	}

	function moveDirAcrossDevice (source, dest, clobber, limit, callback) {
	  var options = {
	    stopOnErr: true,
	    clobber: false,
	    limit: limit
	  }

	  function startNcp () {
	    ncp(source, dest, options, function (errList) {
	      if (errList) return callback(errList[0])
	      rimraf(source, callback)
	    })
	  }

	  if (clobber) {
	    rimraf(dest, function (err) {
	      if (err) return callback(err)
	      startNcp()
	    })
	  } else {
	    startNcp()
	  }
	}

	module.exports = {
	  move: mv
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  createOutputStream: __webpack_require__(48)
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	var fs = __webpack_require__(5)
	var mkdir = __webpack_require__(19)
	var WriteStream = fs.WriteStream

	function createOutputStream (file, options) {
	  var dirExists = false
	  var dir = path.dirname(file)
	  options = options || {}

	  // if fd is set with an actual number, file is created, hence directory is too
	  if (options.fd) {
	    return fs.createWriteStream(file, options)
	  } else {
	    // this hacks the WriteStream constructor from calling open()
	    options.fd = -1
	  }

	  var ws = new WriteStream(file, options)

	  var oldOpen = ws.open
	  ws.open = function () {
	    ws.fd = null // set actual fd
	    if (dirExists) return oldOpen.call(ws)

	    // this only runs once on first write
	    mkdir.mkdirs(dir, function (err) {
	      if (err) {
	        ws.destroy()
	        ws.emit('error', err)
	        return
	      }
	      dirExists = true
	      oldOpen.call(ws)
	    })
	  }

	  ws.open()

	  return ws
	}

	module.exports = createOutputStream


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(5)
	var path = __webpack_require__(15)
	var mkdir = __webpack_require__(19)
	var remove = __webpack_require__(25)

	function emptyDir (dir, callback) {
	  callback = callback || function () {}
	  fs.readdir(dir, function (err, items) {
	    if (err) return mkdir.mkdirs(dir, callback)

	    items = items.map(function (item) {
	      return path.join(dir, item)
	    })

	    deleteItem()

	    function deleteItem () {
	      var item = items.pop()
	      if (!item) return callback()
	      remove.remove(item, function (err) {
	        if (err) return callback(err)
	        deleteItem()
	      })
	    }
	  })
	}

	function emptyDirSync (dir) {
	  var items
	  try {
	    items = fs.readdirSync(dir)
	  } catch (err) {
	    return mkdir.mkdirsSync(dir)
	  }

	  items.forEach(function (item) {
	    item = path.join(dir, item)
	    remove.removeSync(item)
	  })
	}

	module.exports = {
	  emptyDirSync: emptyDirSync,
	  emptydirSync: emptyDirSync,
	  emptyDir: emptyDir,
	  emptydir: emptyDir
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var file = __webpack_require__(51)
	var link = __webpack_require__(52)
	var symlink = __webpack_require__(53)

	module.exports = {
	  // file
	  createFile: file.createFile,
	  createFileSync: file.createFileSync,
	  ensureFile: file.createFile,
	  ensureFileSync: file.createFileSync,
	  // link
	  createLink: link.createLink,
	  createLinkSync: link.createLinkSync,
	  ensureLink: link.createLink,
	  ensureLinkSync: link.createLinkSync,
	  // symlink
	  createSymlink: symlink.createSymlink,
	  createSymlinkSync: symlink.createSymlinkSync,
	  ensureSymlink: symlink.createSymlink,
	  ensureSymlinkSync: symlink.createSymlinkSync
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	var fs = __webpack_require__(4)
	var mkdir = __webpack_require__(19)

	function createFile (file, callback) {
	  function makeFile () {
	    fs.writeFile(file, '', function (err) {
	      if (err) return callback(err)
	      callback()
	    })
	  }

	  fs.exists(file, function (fileExists) {
	    if (fileExists) return callback()
	    var dir = path.dirname(file)
	    fs.exists(dir, function (dirExists) {
	      if (dirExists) return makeFile()
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err)
	        makeFile()
	      })
	    })
	  })
	}

	function createFileSync (file) {
	  if (fs.existsSync(file)) return

	  var dir = path.dirname(file)
	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir)
	  }

	  fs.writeFileSync(file, '')
	}

	module.exports = {
	  createFile: createFile,
	  createFileSync: createFileSync,
	  // alias
	  ensureFile: createFile,
	  ensureFileSync: createFileSync
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	var fs = __webpack_require__(4)
	var mkdir = __webpack_require__(19)

	function createLink (srcpath, dstpath, callback) {
	  function makeLink (srcpath, dstpath) {
	    fs.link(srcpath, dstpath, function (err) {
	      if (err) return callback(err)
	      callback(null)
	    })
	  }

	  fs.exists(dstpath, function (destinationExists) {
	    if (destinationExists) return callback(null)
	    fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureLink')
	        return callback(err)
	      }

	      var dir = path.dirname(dstpath)
	      fs.exists(dir, function (dirExists) {
	        if (dirExists) return makeLink(srcpath, dstpath)
	        mkdir.mkdirs(dir, function (err) {
	          if (err) return callback(err)
	          makeLink(srcpath, dstpath)
	        })
	      })
	    })
	  })
	}

	function createLinkSync (srcpath, dstpath, callback) {
	  var destinationExists = fs.existsSync(dstpath)
	  if (destinationExists) return undefined

	  try {
	    fs.lstatSync(srcpath)
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink')
	    throw err
	  }

	  var dir = path.dirname(dstpath)
	  var dirExists = fs.existsSync(dir)
	  if (dirExists) return fs.linkSync(srcpath, dstpath)
	  mkdir.mkdirsSync(dir)

	  return fs.linkSync(srcpath, dstpath)
	}

	module.exports = {
	  createLink: createLink,
	  createLinkSync: createLinkSync,
	  // alias
	  ensureLink: createLink,
	  ensureLinkSync: createLinkSync
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	var fs = __webpack_require__(4)
	var _mkdirs = __webpack_require__(19)
	var mkdirs = _mkdirs.mkdirs
	var mkdirsSync = _mkdirs.mkdirsSync

	var _symlinkPaths = __webpack_require__(54)
	var symlinkPaths = _symlinkPaths.symlinkPaths
	var symlinkPathsSync = _symlinkPaths.symlinkPathsSync

	var _symlinkType = __webpack_require__(56)
	var symlinkType = _symlinkType.symlinkType
	var symlinkTypeSync = _symlinkType.symlinkTypeSync

	function createSymlink (srcpath, dstpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type

	  fs.exists(dstpath, function (destinationExists) {
	    if (destinationExists) return callback(null)
	    symlinkPaths(srcpath, dstpath, function (err, relative) {
	      if (err) return callback(err)
	      srcpath = relative.toDst
	      symlinkType(relative.toCwd, type, function (err, type) {
	        if (err) return callback(err)
	        var dir = path.dirname(dstpath)
	        fs.exists(dir, function (dirExists) {
	          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
	          mkdirs(dir, function (err) {
	            if (err) return callback(err)
	            fs.symlink(srcpath, dstpath, type, callback)
	          })
	        })
	      })
	    })
	  })
	}

	function createSymlinkSync (srcpath, dstpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type

	  var destinationExists = fs.existsSync(dstpath)
	  if (destinationExists) return undefined

	  var relative = symlinkPathsSync(srcpath, dstpath)
	  srcpath = relative.toDst
	  type = symlinkTypeSync(relative.toCwd, type)
	  var dir = path.dirname(dstpath)
	  var exists = fs.existsSync(dir)
	  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
	  mkdirsSync(dir)
	  return fs.symlinkSync(srcpath, dstpath, type)
	}

	module.exports = {
	  createSymlink: createSymlink,
	  createSymlinkSync: createSymlinkSync,
	  // alias
	  ensureSymlink: createSymlink,
	  ensureSymlinkSync: createSymlinkSync
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	// path.isAbsolute shim for Node.js 0.10 support
	path.isAbsolute = (path.isAbsolute) ? path.isAbsolute : __webpack_require__(55)
	var fs = __webpack_require__(4)

	/**
	 * Function that returns two types of paths, one relative to symlink, and one
	 * relative to the current working directory. Checks if path is absolute or
	 * relative. If the path is relative, this function checks if the path is
	 * relative to symlink or relative to current working directory. This is an
	 * initiative to find a smarter `srcpath` to supply when building symlinks.
	 * This allows you to determine which path to use out of one of three possible
	 * types of source paths. The first is an absolute path. This is detected by
	 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
	 * see if it exists. If it does it's used, if not an error is returned
	 * (callback)/ thrown (sync). The other two options for `srcpath` are a
	 * relative url. By default Node's `fs.symlink` works by creating a symlink
	 * using `dstpath` and expects the `srcpath` to be relative to the newly
	 * created symlink. If you provide a `srcpath` that does not exist on the file
	 * system it results in a broken symlink. To minimize this, the function
	 * checks to see if the 'relative to symlink' source file exists, and if it
	 * does it will use it. If it does not, it checks if there's a file that
	 * exists that is relative to the current working directory, if does its used.
	 * This preserves the expectations of the original fs.symlink spec and adds
	 * the ability to pass in `relative to current working direcotry` paths.
	 */

	function symlinkPaths (srcpath, dstpath, callback) {
	  if (path.isAbsolute(srcpath)) {
	    return fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureSymlink')
	        return callback(err)
	      }
	      return callback(null, {
	        'toCwd': srcpath,
	        'toDst': srcpath
	      })
	    })
	  } else {
	    var dstdir = path.dirname(dstpath)
	    var relativeToDst = path.join(dstdir, srcpath)
	    return fs.exists(relativeToDst, function (exists) {
	      if (exists) {
	        return callback(null, {
	          'toCwd': relativeToDst,
	          'toDst': srcpath
	        })
	      } else {
	        return fs.lstat(srcpath, function (err, stat) {
	          if (err) {
	            err.message = err.message.replace('lstat', 'ensureSymlink')
	            return callback(err)
	          }
	          return callback(null, {
	            'toCwd': srcpath,
	            'toDst': path.relative(dstdir, srcpath)
	          })
	        })
	      }
	    })
	  }
	}

	function symlinkPathsSync (srcpath, dstpath) {
	  var exists
	  if (path.isAbsolute(srcpath)) {
	    exists = fs.existsSync(srcpath)
	    if (!exists) throw new Error('absolute srcpath does not exist')
	    return {
	      'toCwd': srcpath,
	      'toDst': srcpath
	    }
	  } else {
	    var dstdir = path.dirname(dstpath)
	    var relativeToDst = path.join(dstdir, srcpath)
	    exists = fs.existsSync(relativeToDst)
	    if (exists) {
	      return {
	        'toCwd': relativeToDst,
	        'toDst': srcpath
	      }
	    } else {
	      exists = fs.existsSync(srcpath)
	      if (!exists) throw new Error('relative srcpath does not exist')
	      return {
	        'toCwd': srcpath,
	        'toDst': path.relative(dstdir, srcpath)
	      }
	    }
	  }
	}

	module.exports = {
	  'symlinkPaths': symlinkPaths,
	  'symlinkPathsSync': symlinkPathsSync
	}


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	};

	function win32(path) {
		// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = !!device && device.charAt(1) !== ':';

		// UNC paths are always absolute
		return !!result[2] || isUnc;
	};

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)

	function symlinkType (srcpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type
	  if (type) return callback(null, type)
	  fs.lstat(srcpath, function (err, stats) {
	    if (err) return callback(null, 'file')
	    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
	    callback(null, type)
	  })
	}

	function symlinkTypeSync (srcpath, type) {
	  if (type) return type
	  try {
	    var stats = fs.lstatSync(srcpath)
	  } catch (e) {
	    return 'file'
	  }
	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	module.exports = {
	  symlinkType: symlinkType,
	  symlinkTypeSync: symlinkTypeSync
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(15)
	var fs = __webpack_require__(4)
	var mkdir = __webpack_require__(19)

	function outputFile (file, data, encoding, callback) {
	  if (typeof encoding === 'function') {
	    callback = encoding
	    encoding = 'utf8'
	  }

	  var dir = path.dirname(file)
	  fs.exists(dir, function (itDoes) {
	    if (itDoes) return fs.writeFile(file, data, encoding, callback)

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err)

	      fs.writeFile(file, data, encoding, callback)
	    })
	  })
	}

	function outputFileSync (file, data, encoding) {
	  var dir = path.dirname(file)
	  if (fs.existsSync(dir)) {
	    return fs.writeFileSync.apply(fs, arguments)
	  }
	  mkdir.mkdirsSync(dir)
	  fs.writeFileSync.apply(fs, arguments)
	}

	module.exports = {
	  outputFile: outputFile,
	  outputFileSync: outputFileSync
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var klaw = __webpack_require__(59)

	module.exports = {
	  walk: klaw
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__(12)
	var fs = __webpack_require__(5)
	var path = __webpack_require__(15)
	var Readable = __webpack_require__(10).Readable
	var util = __webpack_require__(11)
	var assign = __webpack_require__(60)

	function Walker (dir, options) {
	  assert.strictEqual(typeof dir, 'string', '`dir` parameter should be of type string. Got type: ' + typeof dir)
	  var defaultStreamOptions = { objectMode: true }
	  var defaultOpts = { queueMethod: 'shift', pathSorter: undefined }
	  options = assign(defaultOpts, options, defaultStreamOptions)

	  Readable.call(this, options)
	  this.root = path.resolve(dir)
	  this.paths = [this.root]
	  this.options = options
	}
	util.inherits(Walker, Readable)

	Walker.prototype._read = function () {
	  if (this.paths.length === 0) return this.push(null)
	  var self = this
	  var pathItem = this.paths[this.options.queueMethod]()

	  fs.lstat(pathItem, function (err, stats) {
	    var item = { path: pathItem, stats: stats }
	    if (err) return self.emit('error', err, item)
	    if (!stats.isDirectory()) return self.push(item)

	    fs.readdir(pathItem, function (err, pathItems) {
	      if (err) {
	        self.push(item)
	        return self.emit('error', err, item)
	      }

	      pathItems = pathItems.map(function (part) { return path.join(pathItem, part) })
	      if (self.options.pathSorter) pathItems.sort(self.options.pathSorter)
	      pathItems.forEach(function (pi) { self.paths.push(pi) })

	      self.push(item)
	    })
	  })
	}

	function walk (root, options) {
	  return new Walker(root, options)
	}

	module.exports = walk


/***/ },
/* 60 */
/***/ function(module, exports) {

	// simple mutable assign (extracted from fs-extra)
	// I really like object-assign package, but I wanted a lean package with zero deps
	function _assign () {
	  var args = [].slice.call(arguments).filter(function (i) { return i })
	  var dest = args.shift()
	  args.forEach(function (src) {
	    Object.keys(src).forEach(function (key) {
	      dest[key] = src[key]
	    })
	  })

	  return dest
	}

	// thank you baby Jesus for Node v4 and Object.assign
	module.exports = Object.assign || _assign


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// MIT license (by Elan Shanker).
	(function(globals) {
	  'use strict';

	  var nextTick = function (fn) {
	    if (typeof setImmediate === 'function') {
	      setImmediate(fn);
	    } else if (typeof process !== 'undefined' && process.nextTick) {
	      process.nextTick(fn);
	    } else {
	      setTimeout(fn, 0);
	    }
	  };

	  var makeIterator = function (tasks) {
	    var makeCallback = function (index) {
	      var fn = function () {
	        if (tasks.length) {
	          tasks[index].apply(null, arguments);
	        }
	        return fn.next();
	      };
	      fn.next = function () {
	        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	      };
	      return fn;
	    };
	    return makeCallback(0);
	  };
	  
	  var _isArray = Array.isArray || function(maybeArray){
	    return Object.prototype.toString.call(maybeArray) === '[object Array]';
	  };

	  var waterfall = function (tasks, callback) {
	    callback = callback || function () {};
	    if (!_isArray(tasks)) {
	      var err = new Error('First argument to waterfall must be an array of functions');
	      return callback(err);
	    }
	    if (!tasks.length) {
	      return callback();
	    }
	    var wrapIterator = function (iterator) {
	      return function (err) {
	        if (err) {
	          callback.apply(null, arguments);
	          callback = function () {};
	        } else {
	          var args = Array.prototype.slice.call(arguments, 1);
	          var next = iterator.next();
	          if (next) {
	            args.push(wrapIterator(next));
	          } else {
	            args.push(callback);
	          }
	          nextTick(function () {
	            iterator.apply(null, args);
	          });
	        }
	      };
	    };
	    wrapIterator(makeIterator(tasks))();
	  };

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return waterfall;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = waterfall; // CommonJS
	  } else {
	    globals.asyncWaterfall = waterfall; // <script>
	  }
	})(this);


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63)
	module.exports.hmac = __webpack_require__(67)

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	
	var Hasher = __webpack_require__(64).Hasher 

	var C_x64 = __webpack_require__(66)
	var X64Word = C_x64.Word;
	var X64WordArray = C_x64.WordArray;

	// Constants
	var K = [
	  X64Word(0x428a2f98, 0xd728ae22), X64Word(0x71374491, 0x23ef65cd),
	  X64Word(0xb5c0fbcf, 0xec4d3b2f), X64Word(0xe9b5dba5, 0x8189dbbc),
	  X64Word(0x3956c25b, 0xf348b538), X64Word(0x59f111f1, 0xb605d019),
	  X64Word(0x923f82a4, 0xaf194f9b), X64Word(0xab1c5ed5, 0xda6d8118),
	  X64Word(0xd807aa98, 0xa3030242), X64Word(0x12835b01, 0x45706fbe),
	  X64Word(0x243185be, 0x4ee4b28c), X64Word(0x550c7dc3, 0xd5ffb4e2),
	  X64Word(0x72be5d74, 0xf27b896f), X64Word(0x80deb1fe, 0x3b1696b1),
	  X64Word(0x9bdc06a7, 0x25c71235), X64Word(0xc19bf174, 0xcf692694),
	  X64Word(0xe49b69c1, 0x9ef14ad2), X64Word(0xefbe4786, 0x384f25e3),
	  X64Word(0x0fc19dc6, 0x8b8cd5b5), X64Word(0x240ca1cc, 0x77ac9c65),
	  X64Word(0x2de92c6f, 0x592b0275), X64Word(0x4a7484aa, 0x6ea6e483),
	  X64Word(0x5cb0a9dc, 0xbd41fbd4), X64Word(0x76f988da, 0x831153b5),
	  X64Word(0x983e5152, 0xee66dfab), X64Word(0xa831c66d, 0x2db43210),
	  X64Word(0xb00327c8, 0x98fb213f), X64Word(0xbf597fc7, 0xbeef0ee4),
	  X64Word(0xc6e00bf3, 0x3da88fc2), X64Word(0xd5a79147, 0x930aa725),
	  X64Word(0x06ca6351, 0xe003826f), X64Word(0x14292967, 0x0a0e6e70),
	  X64Word(0x27b70a85, 0x46d22ffc), X64Word(0x2e1b2138, 0x5c26c926),
	  X64Word(0x4d2c6dfc, 0x5ac42aed), X64Word(0x53380d13, 0x9d95b3df),
	  X64Word(0x650a7354, 0x8baf63de), X64Word(0x766a0abb, 0x3c77b2a8),
	  X64Word(0x81c2c92e, 0x47edaee6), X64Word(0x92722c85, 0x1482353b),
	  X64Word(0xa2bfe8a1, 0x4cf10364), X64Word(0xa81a664b, 0xbc423001),
	  X64Word(0xc24b8b70, 0xd0f89791), X64Word(0xc76c51a3, 0x0654be30),
	  X64Word(0xd192e819, 0xd6ef5218), X64Word(0xd6990624, 0x5565a910),
	  X64Word(0xf40e3585, 0x5771202a), X64Word(0x106aa070, 0x32bbd1b8),
	  X64Word(0x19a4c116, 0xb8d2d0c8), X64Word(0x1e376c08, 0x5141ab53),
	  X64Word(0x2748774c, 0xdf8eeb99), X64Word(0x34b0bcb5, 0xe19b48a8),
	  X64Word(0x391c0cb3, 0xc5c95a63), X64Word(0x4ed8aa4a, 0xe3418acb),
	  X64Word(0x5b9cca4f, 0x7763e373), X64Word(0x682e6ff3, 0xd6b2b8a3),
	  X64Word(0x748f82ee, 0x5defb2fc), X64Word(0x78a5636f, 0x43172f60),
	  X64Word(0x84c87814, 0xa1f0ab72), X64Word(0x8cc70208, 0x1a6439ec),
	  X64Word(0x90befffa, 0x23631e28), X64Word(0xa4506ceb, 0xde82bde9),
	  X64Word(0xbef9a3f7, 0xb2c67915), X64Word(0xc67178f2, 0xe372532b),
	  X64Word(0xca273ece, 0xea26619c), X64Word(0xd186b8c7, 0x21c0c207),
	  X64Word(0xeada7dd6, 0xcde0eb1e), X64Word(0xf57d4f7f, 0xee6ed178),
	  X64Word(0x06f067aa, 0x72176fba), X64Word(0x0a637dc5, 0xa2c898a6),
	  X64Word(0x113f9804, 0xbef90dae), X64Word(0x1b710b35, 0x131c471b),
	  X64Word(0x28db77f5, 0x23047d84), X64Word(0x32caab7b, 0x40c72493),
	  X64Word(0x3c9ebe0a, 0x15c9bebc), X64Word(0x431d67c4, 0x9c100d4c),
	  X64Word(0x4cc5d4be, 0xcb3e42b6), X64Word(0x597f299c, 0xfc657e2a),
	  X64Word(0x5fcb6fab, 0x3ad6faec), X64Word(0x6c44198c, 0x4a475817)
	];

	// Reusable objects
	var W = [];
	(function () {
	  for (var i = 0; i < 80; i++) {
	    W[i] = X64Word();
	  }
	}());

	/**
	 * SHA-512 hash algorithm.
	 */
	var SHA512 = Hasher.extend({
	  _doReset: function () {
	    this._hash = new X64WordArray([
	      X64Word(0x6a09e667, 0xf3bcc908), X64Word(0xbb67ae85, 0x84caa73b),
	      X64Word(0x3c6ef372, 0xfe94f82b), X64Word(0xa54ff53a, 0x5f1d36f1),
	      X64Word(0x510e527f, 0xade682d1), X64Word(0x9b05688c, 0x2b3e6c1f),
	      X64Word(0x1f83d9ab, 0xfb41bd6b), X64Word(0x5be0cd19, 0x137e2179)
	    ]);
	  },

	  _doProcessBlock: function (M, offset) {
	    // Shortcuts
	    var H = this._hash.words;

	    var H0 = H[0]; var H1 = H[1]; var H2 = H[2];
	    var H3 = H[3]; var H4 = H[4]; var H5 = H[5];
	    var H6 = H[6]; var H7 = H[7];

	    var H0h = H0.high; var H0l = H0.low;
	    var H1h = H1.high; var H1l = H1.low;
	    var H2h = H2.high; var H2l = H2.low;
	    var H3h = H3.high; var H3l = H3.low;
	    var H4h = H4.high; var H4l = H4.low;
	    var H5h = H5.high; var H5l = H5.low;
	    var H6h = H6.high; var H6l = H6.low;
	    var H7h = H7.high; var H7l = H7.low;

	    // Working variables
	    var ah = H0h; var al = H0l;
	    var bh = H1h; var bl = H1l;
	    var ch = H2h; var cl = H2l;
	    var dh = H3h; var dl = H3l;
	    var eh = H4h; var el = H4l;
	    var fh = H5h; var fl = H5l;
	    var gh = H6h; var gl = H6l;
	    var hh = H7h; var hl = H7l;

	    // Rounds
	    for (var i = 0; i < 80; i++) {
	      // Shortcut
	      var Wi = W[i];

	      // Extend message
	      if (i < 16) {
	        var Wih = Wi.high = M[offset + i * 2]     | 0;
	        var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	      } else {
	        // Gamma0
	        var gamma0x  = W[i - 15];
	        var gamma0xh = gamma0x.high;
	        var gamma0xl = gamma0x.low;
	        var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	        var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	        // Gamma1
	        var gamma1x  = W[i - 2];
	        var gamma1xh = gamma1x.high;
	        var gamma1xl = gamma1x.low;
	        var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	        var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[i - 7];
	        var Wi7h = Wi7.high;
	        var Wi7l = Wi7.low;

	        var Wi16  = W[i - 16];
	        var Wi16h = Wi16.high;
	        var Wi16l = Wi16.low;

	        var Wil = gamma0l + Wi7l;
	        var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	        var Wil = Wil + gamma1l;
	        var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	        var Wil = Wil + Wi16l;
	        var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	        Wi.high = Wih;
	        Wi.low  = Wil;
	      }

	      var chh  = (eh & fh) ^ (~eh & gh);
	      var chl  = (el & fl) ^ (~el & gl);
	      var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	      var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	      var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	      var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	      var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	      var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki  = K[i];
	      var Kih = Ki.high;
	      var Kil = Ki.low;

	      var t1l = hl + sigma1l;
	      var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	      var t1l = t1l + chl;
	      var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	      var t1l = t1l + Kil;
	      var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	      var t1l = t1l + Wil;
	      var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	      // Update working variables
	      hh = gh; hl = gl;
	      gh = fh; gl = fl;
	      fh = eh; fl = el;
	      el = (dl + t1l) | 0;
	      eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	      dh = ch; dl = cl;
	      ch = bh; cl = bl;
	      bh = ah; bl = al;
	      al = (t1l + t2l) | 0;
	      ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	    }

	    // Intermediate hash value
	    H0l = H0.low  = (H0l + al);
	    H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	    H1l = H1.low  = (H1l + bl);
	    H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	    H2l = H2.low  = (H2l + cl);
	    H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	    H3l = H3.low  = (H3l + dl);
	    H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	    H4l = H4.low  = (H4l + el);
	    H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	    H5l = H5.low  = (H5l + fl);
	    H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	    H6l = H6.low  = (H6l + gl);
	    H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	    H7l = H7.low  = (H7l + hl);
	    H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	  },

	  _doFinalize: function () {
	    // Shortcuts
	    var data = this._data;
	    var dataWords = data.words;

	    var nBitsTotal = this._nDataBytes * 8;
	    var nBitsLeft = data.sigBytes * 8;

	    // Add padding
	    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	    data.sigBytes = dataWords.length * 4;

	    // Hash final blocks
	    this._process();

	    // Convert hash to 32-bit word array before returning
	    var hash = this._hash.toX32();

	    // Return final computed hash
	    return hash;
	  },

	  clone: function () {
	    var clone = Hasher.clone.call(this);
	    clone._hash = this._hash.clone();

	    return clone;
	  },

	  blockSize: 1024/32
	});


	module.exports = Hasher._createHelper(SHA512);
	module.exports.sha512 = SHA512



/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var WordArray = __webpack_require__(65)

	var Base = (function () {
	  function F() {}

	  return {
	    /**
	     * Creates a new object that inherits from this object.
	     *
	     * @param {Object} overrides Properties to copy into the new object.
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         field: 'value',
	     *
	     *         method: function () {
	     *         }
	     *     });
	     */
	    extend: function (overrides) {
	      // Spawn
	      F.prototype = this;
	      var subtype = new F();

	      // Augment
	      if (overrides) {
	        subtype.mixIn(overrides);
	      }

	      // Create default initializer
	      if (!subtype.hasOwnProperty('init')) {
	        subtype.init = function () {
	          subtype.$super.init.apply(this, arguments);
	        };
	      }

	      // Initializer's prototype is the subtype object
	      subtype.init.prototype = subtype;

	      // Reference supertype
	      subtype.$super = this;

	      return subtype;
	    },

	    /**
	     * Extends this object and runs the init method.
	     * Arguments to create() will be passed to init().
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var instance = MyType.create();
	     */
	    create: function () {
	      var instance = this.extend();
	      instance.init.apply(instance, arguments);

	      return instance;
	    },

	    /**
	     * Initializes a newly created object.
	     * Override this method to add some logic when your objects are created.
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         init: function () {
	     *             // ...
	     *         }
	     *     });
	     */
	      init: function () {
	    },


	    mixIn: function (properties) {
	      for (var propertyName in properties) {
	        if (properties.hasOwnProperty(propertyName)) {
	          this[propertyName] = properties[propertyName];
	        }
	      }

	      // IE won't copy toString using the loop above
	      if (properties.hasOwnProperty('toString')) {
	        this.toString = properties.toString;
	      }
	    },


	    clone: function () {
	      return this.init.prototype.extend(this);
	    }
	  };
	}());


	/**
	 * Abstract buffered block algorithm template.
	 *
	 * The property blockSize must be implemented in a concrete subtype.
	 *
	 * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	 */
	var BufferedBlockAlgorithm = Base.extend({
	  /**
	   * Resets this block algorithm's data buffer to its initial state.
	   *
	   * @example
	   *
	   *     bufferedBlockAlgorithm.reset();
	   */
	    reset: function () {
	      // Initial values
	      this._data = new WordArray();
	      this._nDataBytes = 0;
	    },

	    /**
	     * Adds new data to this block algorithm's buffer.
	     *
	     * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	     *
	     * @example
	     *
	     *     bufferedBlockAlgorithm._append('data');
	     *     bufferedBlockAlgorithm._append(wordArray);
	     */
	    _append: function (data) {
	      //console.dir(data)

	      if (Buffer.isBuffer(data)) {
	        data = WordArray.fromBuffer(data)
	      }

	      // Append
	      this._data.concat(data);
	      this._nDataBytes += data.sigBytes;
	    },

	    /**
	     * Processes available data blocks.
	     *
	     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	     *
	     * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	     *
	     * @return {WordArray} The processed data.
	     *
	     * @example
	     *
	     *     var processedData = bufferedBlockAlgorithm._process();
	     *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	     */
	    _process: function (doFlush) {
	      // Shortcuts
	      var data = this._data;
	      var dataWords = data.words;
	      var dataSigBytes = data.sigBytes;
	      var blockSize = this.blockSize;
	      var blockSizeBytes = blockSize * 4;

	      // Count blocks ready
	      var nBlocksReady = dataSigBytes / blockSizeBytes;
	      if (doFlush) {
	          // Round up to include partial blocks
	          nBlocksReady = Math.ceil(nBlocksReady);
	      } else {
	          // Round down to include only full blocks,
	          // less the number of blocks that must remain in the buffer
	          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	      }

	      // Count words ready
	      var nWordsReady = nBlocksReady * blockSize;

	      // Count bytes ready
	      var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	      // Process blocks
	      if (nWordsReady) {
	        for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	          // Perform concrete-algorithm logic
	          this._doProcessBlock(dataWords, offset);
	        }

	        // Remove processed words
	        var processedWords = dataWords.splice(0, nWordsReady);
	        data.sigBytes -= nBytesReady;
	      }

	      // Return processed words
	      return new WordArray(processedWords, nBytesReady);
	    },

	    /**
	     * Creates a copy of this object.
	     * @example
	     *
	     *     var clone = bufferedBlockAlgorithm.clone();
	     */
	    clone: function () {
	      var clone = Base.clone.call(this);
	      clone._data = this._data.clone();

	      return clone;
	    },

	      _minBufferSize: 0
	    });

	/**
	 * Abstract hasher template.
	 *
	 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	 */
	var Hasher = BufferedBlockAlgorithm.extend({
	  /**
	   * Configuration options.
	   */
	  cfg: Base.extend(),

	  /**
	   * Initializes a newly created hasher.
	   * @example
	   *
	   *     var hasher = CryptoJS.algo.SHA256.create();
	   */
	  init: function (cfg) {
	    // Apply config defaults
	    this.cfg = this.cfg.extend(cfg);

	    // Set initial values
	    this.reset();
	  },

	  reset: function () {
	    // Reset data buffer
	    BufferedBlockAlgorithm.reset.call(this);

	    // Perform concrete-hasher logic
	    this._doReset();
	  },

	  update: function (messageUpdate) {
	    if (typeof messageUpdate == 'string')
	      messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	    if (Buffer.isBuffer(messageUpdate))
	      messageUpdate = WordArray.fromBuffer(messageUpdate)

	    // Append
	    this._append(messageUpdate);

	    // Update the hash
	    this._process();

	    // Chainable
	    return this;
	  },

	  finalize: function (messageUpdate) {
	    if (typeof messageUpdate == 'string')
	      messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	    if (Buffer.isBuffer(messageUpdate))
	      messageUpdate = WordArray.fromBuffer(messageUpdate)


	    // Final message update
	    if (messageUpdate) {
	      this._append(messageUpdate);
	    }

	    // Perform concrete-hasher logic
	    var hash = this._doFinalize();

	    return hash.toBuffer()
	  },

	  blockSize: 512/32,

	  /** TODO: DELETE
	   * Creates a shortcut function to a hasher's object interface.
	   * @example
	   *
	   *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	   */
	  _createHelper: function (hasher) {
	    return function (message, cfg) {
	      return new hasher.init(cfg).finalize(message);
	    };
	  }

	});

	module.exports.Hasher = Hasher




/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = WordArray

	/** An array of 32-bit words. */
	function WordArray(words, sigBytes) {
	  this.words = words || [];

	  if (sigBytes != undefined) {
	      this.sigBytes = sigBytes;
	  } else {
	      this.sigBytes = this.words.length * 4;
	  }
	}

	/**
	 * Concatenates a word array to this word array.
	 *
	 * @param {WordArray} wordArray The word array to append.
	 *
	 * @return {WordArray} This word array.
	 *
	 * @example
	 *
	 *     wordArray1.concat(wordArray2);
	 */
	WordArray.prototype.concat = function (wordArray) {
	  if (Buffer.isBuffer(wordArray))
	    wordArray = WordArray.fromBuffer(wordArray)

	        // Shortcuts
	        var thisWords = this.words;
	        var thatWords = wordArray.words;
	        var thisSigBytes = this.sigBytes;
	        var thatSigBytes = wordArray.sigBytes;

	        // Clamp excess bits
	        this.clamp();

	        // Concat
	        if (thisSigBytes % 4) {
	            // Copy one byte at a time
	            for (var i = 0; i < thatSigBytes; i++) {
	                var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	            }
	        } else if (thatWords.length > 0xffff) {
	            // Copy one word at a time
	            for (var i = 0; i < thatSigBytes; i += 4) {
	                thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	            }
	        } else {
	            // Copy all words at once
	            thisWords.push.apply(thisWords, thatWords);
	        }
	        this.sigBytes += thatSigBytes;

	        // Chainable
	        return this;
	}

	/**
	 * Removes insignificant bits.
	 *
	 */
	WordArray.prototype.clamp = function () {
	  // Shortcuts
	  var words = this.words;
	  var sigBytes = this.sigBytes;

	  // Clamp
	  words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	  words.length = Math.ceil(sigBytes / 4);
	}

	WordArray.prototype.clone = function() {
	  var wa = new WordArray(this.words.slice(0))
	  return wa
	}

	WordArray.prototype.toBuffer = function() {
	  var buf = new Buffer(this.words.length * 4)
	  for (var i = 0; i < this.words.length; ++i) {
	    var w = this.words[i]
	    buf.writeUInt32BE(w, i*4, true)
	  }
	  return buf 
	}

	WordArray.fromBuffer = function(buf) {
	  var len = buf.length
	  var dif = len % 4
	  var w = []

	  if (!process.browser) {
	    for (var i = 0; i < len; i += 4) {
	      var n = buf.readUInt32BE(i, true) 
	      w.push(n)
	    }
	    return new WordArray(w, buf.length)
	  } else { //bug in browserify / buffer
	    for (var i = 0; i < len - dif; i += 4) {
	      var n = buf.readUInt32BE(i)
	      w.push(n)
	    }
	    var lw = 0x0
	    var off = len - dif
	    for (var j = 0; j < dif; j += 1) {
	      lw |=  (buf.readUInt8(off + j) << ((3-j)*8))
	    }
	    if (dif > 0)
	      w.push(lw)
	    return new WordArray(w, buf.length)
	  } 
	}




/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var X32WordArray = __webpack_require__(65)


	function X64Word(high, low) {
	  if (!(this instanceof X64Word)) return new X64Word(high, low)
	  this.high = high
	  this.low = low
	}

	function X64WordArray (words) {
	  this.words = words || [];
	}

	/**
	 * Converts this 64-bit word array to a 32-bit word array.
	 */
	X64WordArray.prototype.toX32 = function () {
	  // Shortcuts
	  var x64Words = this.words;
	  var x64WordsLength = x64Words.length;

	  // Convert
	  var x32Words = [];
	  for (var i = 0; i < x64WordsLength; i++) {
	      var x64Word = x64Words[i];
	      x32Words.push(x64Word.high);
	      x32Words.push(x64Word.low);
	  }

	  return new X32WordArray(x32Words, this.sigBytes);
	}


	module.exports.Word = X64Word
	module.exports.WordArray = X64WordArray



/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var sha512 = __webpack_require__(63).sha512
	var WordArray = __webpack_require__(65)

	function HMAC(key) {
	  if (!(this instanceof HMAC))
	    return new HMAC(key)

	  // Init hasher
	  var hasher = this._hasher = new sha512.init()//new hasher.init();

	  // Convert string to WordArray, else assume WordArray already
	  if (typeof key == 'string') {
	    key = WordArray.fromBuffer(new Buffer(key, 'utf8'));
	  }

	  if (Buffer.isBuffer(key)) {
	    key = WordArray.fromBuffer(key)
	  }

	  // Shortcuts
	  var hasherBlockSize = hasher.blockSize;
	  var hasherBlockSizeBytes = hasherBlockSize * 4;

	  // Allow arbitrary length keys
	  if (key.sigBytes > hasherBlockSizeBytes) {
	      key = hasher.finalize(key);
	  }

	  // Clamp excess bits
	  key.clamp();

	  // Clone key for inner and outer pads
	  var oKey = this._oKey = key.clone();
	  var iKey = this._iKey = key.clone();

	  // Shortcuts
	  var oKeyWords = oKey.words;
	  var iKeyWords = iKey.words;

	  // XOR keys with pad constants
	  for (var i = 0; i < hasherBlockSize; i++) {
	    oKeyWords[i] ^= 0x5c5c5c5c;
	    iKeyWords[i] ^= 0x36363636;
	  }
	  oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	  // Set initial values
	  this.reset();
	}

	HMAC.prototype.reset = function () {
	  // Shortcut
	  var hasher = this._hasher;

	  // Reset
	  hasher.reset();
	  hasher.update(this._iKey);
	}

	HMAC.prototype.update = function (messageUpdate) {
	  if (typeof messageUpdate == 'string')
	    messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	  if (Buffer.isBuffer(messageUpdate))
	    messageUpdate = WordArray.fromBuffer(messageUpdate)

	  this._hasher.update(messageUpdate);

	  // Chainable
	  return this;
	}

	HMAC.prototype.finalize = function (messageUpdate) {
	   if (typeof messageUpdate == 'string')
	    messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	  if (Buffer.isBuffer(messageUpdate))
	    messageUpdate = WordArray.fromBuffer(messageUpdate)

	  // Shortcut
	  var hasher = this._hasher;

	  // Compute HMAC
	  var innerHash = hasher.finalize(messageUpdate);
	  hasher.reset();
	  var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	  return hmac;
	}
	  

	module.exports = HMAC


/***/ }
/******/ ]);